<template>
  <div class="openlayer">
    <div id="map" ref="rootMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
import 'ol/ol.css'
import { Map, View } from 'ol'
import { XYZ, Vector } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON' // 用于加载json数据
import VectorLayer from 'ol/layer/Vector' // 用于创建矢量图层
import TileLayer from 'ol/layer/Tile' // 用于指定地图数据来源
import geojsonObject from '@/json/hz.json'
import VectorSource from 'ol/source/Vector'
import { Stroke, Style, Fill } from 'ol/style'
// import Draw from 'ol/interaction/Draw';
// import mapconfig from '@/config/mapconfig.js'
export default {
  data() {
    return {
      mapData: null,
      mapCenter: [120.144526, 30.282869],
      mapZoom: 8,
      clickCenter:[0, 0]
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const mapContainer = this.$refs.rootMap
      /**
       * TileLayers : 切片图层，用于加载切片数据。切片是指利用网格将一幅地图切成大小相等的正方形。
       * Image layers：图片图层， 主要是指服务为端渲染的图像，可能是已经渲染好的图片，或者是每一次请求，都根据请求内容定制化的生成一幅图片，该图层类型支持任意的范围和分辨率。
       * Vector Layers：食量图层，是指在客户端进行渲染的图层，服务器返回的数据或者文件会通过openlayers进行渲染，生成矢量图层。
       * Vector Tile：矢量切片图层 ， 通过切割矢量数据，GeoJSON等。
       */
      var tian_di_tu_annotation = new TileLayer({
        source: new XYZ({
          url:
            'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=17d1619c13e4508bc1945bd59de4edf8'
        })
      })
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      })
      var geoLayers = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        })
      })
      var maplayer = new TileLayer({
        source: new XYZ({
          url:
            'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=17d1619c13e4508bc1945bd59de4edf8'
        })
      })
      const map = new Map({
        layers: [maplayer, tian_di_tu_annotation, geoLayers], // 添加地图图层  Object | Array
        target: mapContainer, // 地图容器 id | element
        view: new View({
          // 创建地图视图
          projection: 'EPSG:4326',
          center: this.mapCenter,
          zoom: this.mapZoom
        })
      })
      this.mapData = map

      this.mapData.on('click', this.mapClick)
    },
    mapClick(evt){
        // 获取点击中心点
        this.clickCenter = evt.coordinate
        // 移动地图
        this.mapData.getView().animate({
          center:evt.coordinate,
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.openlayer {
  height: 100vh;
  width: 100vw;
}
#map {
  height: 100%;
  width: 100vw;
  background: #f2f2f2;
}
</style>
