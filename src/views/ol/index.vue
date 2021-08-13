<template>
  <div class="openlayer">
    <div id="map" ref="rootMap">
      <MapPopup
        ref="popup"
        :position="mapPopupData.position"
        :title="mapPopupData.title"
        :offset="mapPopupData.offset"
        :mapShow="mapPopupData.show"
        @close="mapPopupClose"
        :className="'map-popup'"
        >{{ popupText }}</MapPopup
      >
      <Button @click="addMark" class="click-button">click Me!</Button>
      <Button @click="addLayers" class="click-button click-button-tdt"
        >加载底图</Button
      >
      <!-- <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import 'ol/ol.css'
import { Map, View } from 'ol'
import { XYZ } from 'ol/source'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON' // 用于加载json数据
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import geojsonObject from '../../json/hz.json'
import VectorSource from 'ol/source/Vector'
import { Stroke, Style, Fill, Icon, Circle,Text } from 'ol/style'
import { fromLonLat, toLonLat } from 'ol/proj';
import MapPopup from '@/components/ol/MapPopup'
import { getTianditu } from '@/assets/js/getTDTUrl.js'
// import Draw from 'ol/interaction/Draw';
// import mapconfig from '@/config/mapconfig.js'
export default {
  data() {
    return {
      mapData: null,
      mapCenter: [120.144526, 30.282869],
      mapZoom: 8,
      clickCenter:[0, 0],
      // 弹出窗体图层数据
      mapPopupData:{
        position: [ 114.06919853061095, 22.52312915135971 ], // 弹窗中心点 Array[array]， 必须
        title: '弹窗标题', // 弹窗标题 String，非必须，默认为 ' '
        show: false, // 弹窗显隐 Boolean，必须，默认为 true
        offset:[0, 0], // 弹窗偏移 Array[number]，必须，默认为 [0, 0]
        className: 'map-popup' // 图层的class String，非必须，默认为 'map-popup'
      },
      popupText: ''
    }
  },
  components:{
    MapPopup
  },
  mounted() {
    this.initMap()
  },
  methods: {
    /**
     * 栅格数据：栅格数据是将空间看做离散的像元，由二位数组或者其它组织方式来进行表达，栅格最小单位是像素，栅格数据的属性由像素的像素值来表示
     * 矢量数据：他将空间看成是连续的，用要素(点线面)来进行表达，矢量的最小单位是要素，矢量数据的属性由要素的属性来表示，拓扑关系是基于矢量数据的
     */
    initMap() {
      const mapContainer = this.$refs.rootMap
      /**
       * TileLayers : 切片图层，用于加载切片数据。切片是指利用网格将一幅地图切成大小相等的正方形。
       * Image layers：图片图层， 主要是指服务为端渲染的图像，可能是已经渲染好的图片，或者是每一次请求，都根据请求内容定制化的生成一幅图片，该图层类型支持任意的范围和分辨率。
       * Vector Layers：矢量图层，是指在客户端进行渲染的图层，服务器返回的数据或者文件会通过openlayers进行渲染，生成矢量图层。
       * Vector Tile：矢量切片图层 ， 通过切割矢量数据，GeoJSON等。
       */
      const tian_di_tu_annotation = new TileLayer({
        source: new XYZ({
          url:
            'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=17d1619c13e4508bc1945bd59de4edf8'
        })
      })
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      })
      const geoLayers = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        }),
        zIndex: 1
      })
      const maplayer = new TileLayer({
        source: new XYZ({
          url:
            'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=17d1619c13e4508bc1945bd59de4edf8'
        })
      })
      // fromLonLat 坐标转换 将EPSG:4326 转换为 EPSG: 3857
      // toLonLat 将EPSG: 3857 转化为 EPSG:4326
      // transform transform([坐标], 'EPSG: 3857', 'EPSG: 4326') 或 transform([坐标], 'EPSG: 4326', 'EPSG: 3857')
      // 添加标记 maplayer, tian_di_tu_annotation,
      const map = new Map({
        layers: [geoLayers], // 添加地图图层  Object | Array
        target: mapContainer, // 地图容器 id | element
        logo: true,
        view: new View({
          // 创建地图视图
          // EPSG: 4326 等同于WGS84坐标系 、 EPSG:3857 等同于900913 由墨卡托投影而来 经常用于web地图
          projection: 'EPSG:4326', // 默认使用 EPSG:3857 坐标系
          center: this.mapCenter,
          zoom: this.mapZoom,
          minZoom: 1,
          maxZoom: 13
        })
      })
      this.mapData = map
      this.mapData.on('singleclick', this.mapClick)
    },
    addLayers(){
      var tdt = getTianditu({
        type: '影像底图',
        proj: '经纬度投影',
        key: '17d1619c13e4508bc1945bd59de4edf8'
      });
      this.mapData.addLayer(tdt)
    },
    addMark(){
      const markLayers = new VectorLayer({
        source: new VectorSource(),
        zIndex:1000
      })
      const markIcon = new Feature({
        geometry: new Point([120.144526, 30.282869])
      })
      markIcon.setStyle(
        new Style({
          // text:new Text({
          //   text:'123123'
          // }),
          image: new Icon({
            // src: '../../assets/logo.png'
            src: require('@assets/logo.png'),
            size: [40, 40]
          })
        })
      )
      // debugger
      markLayers.getSource().addFeature(markIcon)
      this.mapData.addLayer(markLayers)
      this.mapData.getView().setCenter([120.144526, 30.282869])
      this.mapData.getView().setZoom(18)
    },
    mapClick(evt){
        // 获取点击中心点
        this.clickCenter = evt.coordinate
        this.mapPopupData.show = true
        this.mapPopupData.position = evt.coordinate
        this.mapPopupData.title = `当前坐标${this.mapPopupData.position}`
        // 移动地图
        // this.mapData.getView().animate({
        //   center:evt.coordinate,
        // })
    },
    // 关闭弹出窗体事件
    mapPopupClose(e){
      this.mapPopupData.show = false
      this.popupText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.openlayer {
  height: 100vh;
  width: 100vw;
}
.click-button, .logo{
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
}
.click-button-tdt{
  top: 60px;
}
.logo{
  top: 60px;
}
#map {
  height: 100%;
  width: 100vw;
  background: #f2f2f2;
}
</style>
