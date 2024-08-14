<!--
   @description 百度地图
   @author slh   
   @createDate 2024年08月02日 16:44:51
-->

<template>
  <CommonPage showFooter>
    <div class="map-container">
      <div ref="container" :style="{ height: height + 'px', width: '100%' }"></div>
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import { useCreateScript } from '@/utils/func'
import { onMounted, ref, watch } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import { MapStyle } from '@/utils/typeset'

defineOptions({
  name: 'Baidu'
})

const SCRIPT_URL =
  'http://api.map.baidu.com/getscript?v=3.0&ak=WxbQmaOc3bvSGSaKWcyeFSf8fnYCWpKd&services=&t=' +
  new Date().getTime()

const container = ref<HTMLDivElement | null>(null)

const height = ref(0)

const createScriptPromise = useCreateScript(SCRIPT_URL)

/** SCRIPT_URL 版本过旧，部分API不支持 */
const initMap = () => {
  /** 获取容器高度 */
  height.value = container.value?.parentElement?.getBoundingClientRect().height || 0
  /** 创建脚本加载的Promise */
  createScriptPromise.then(() => {
    /** 通过window.BMap获取百度地图的API，然后创建一个新的地图实例 */
    const bMap = (window as any).BMap
    const map = new bMap.Map(container.value)
    /** 设置地图中心点和缩放级别 */
    const point = new bMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 7)
    /** 启用鼠标滚轮缩放 */
    map.enableScrollWheelZoom()
    /** 设置地图样式 */
    map.setMapStyleV2({ styleId: MapStyle.normal })
    mapAddControl(bMap, map)
  })
}

const mapAddControl = (bMap: any, map: any) => {
  /** 缩放控件 */
  const zoomControl = new bMap.NavigationControl()
  map.addControl(zoomControl)
  /** 比例尺控件 */
  const scaleControl = new bMap.ScaleControl()
  map.addControl(scaleControl)
  /** 缩略图控件 */
  const overviewMapControl = new bMap.OverviewMapControl()
  map.addControl(overviewMapControl)
}

onMounted(() => {
  initMap()
})
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
