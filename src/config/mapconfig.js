import TileLayer from 'ol/layer/Tile'
import { OSM, XYZ, TileArcGISRest } from 'ol/source'
const maptype = 0
// 0 表示部署的离线瓦片地图，1表示OSM, 2表示使用Arcgis在线午夜蓝地图服务
const streetmap = function() {
  let maplayer = null
  switch (maptype) {
    case 0:
      maplayer = new TileLayer({
        source: new XYZ({
          url:
            'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=17d1619c13e4508bc1945bd59de4edf8'
        })
      })
      break
    case 1:
      maplayer = new TileLayer({
        source: new OSM()
      })
      break
    case 2:
      maplayer = new TileLayer({
        source: new TileArcGISRest({
          url:
            'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
      })
      break
  }
  return [maplayer]
}
const mapconfig = {
  streetmap: streetmap
}
export default mapconfig
