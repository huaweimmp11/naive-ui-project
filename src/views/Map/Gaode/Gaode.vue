<!--
   @description 高德地图
   @author slh   
   @createDate 2024年08月02日 16:00:08
-->

<template>
  <CommonPage showFooter>
    <div class="map-container">
      <div ref="container" :style="{ height: height + 'px', width: '100%' }"></div>
      <div class="setting">
        <div class="flex gap-10">
          <span>视图模式</span>
          <n-switch
            :rail-style="railStyle"
            v-model:value="viewMode"
            checked-value="2D"
            unchecked-value="3D"
          >
            <template #checked v-model:value="viewMode"> 2D </template>
            <template #unchecked v-model:value="viewMode"> 3D </template>
          </n-switch>
        </div>
        <div class="flex gap-10 mt-14" v-if="viewMode === '3D'">
          <span>3D俯仰角</span>
          <span>右键拖动</span>
        </div>
      </div>
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import { useCreateScript } from '@/utils/func'
import { onMounted, ref, watch } from 'vue'
import CommonPage from '@/components/CommonPage.vue'

defineOptions({
  name: 'Gaode'
})

const SCRIPT_URL = 'https://webapi.amap.com/maps?v=1.4.15&key=9f2d3fcc4b12a7c915fded4b55902e21'

const container = ref<HTMLDivElement | null>(null)

const height = ref(0)

const createScriptPromise: any = useCreateScript(SCRIPT_URL)

const viewMode = ref<'2D' | '3D'>('2D')

const pitch = ref<number>(0)

const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
  const style: any = {}
  if (checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}

/**
 * 初始化地图
 * 使用了高德地图（AMap）的API来创建一个3D地图
 */
const initMap = () => {
  /** getBoundingClientRect 是一个用于获取元素大小及其相对于视口位置的方法 */
  height.value = container.value?.parentElement?.getBoundingClientRect().height || 0
  createScriptPromise.then(() => {
    const aMap = (window as any).AMap
    new aMap.Map(container.value, {
      /** 地图的缩放级别 */
      zoom: 22,
      /** 中国北京市的经纬度 */
      center: [116.397428, 39.90923],
      /** 地图的视图模式 */
      viewMode: viewMode.value,
      /** 地图的俯仰角 */
      pitch: pitch.value
    })
  })
}

onMounted(() => {
  initMap()
})

watch(
  () => viewMode.value,
  (val) => {
    if (val === '3D') pitch.value = 60
    initMap()
  }
)
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  .setting {
    position: absolute;
    width: 200px;
    padding: 10px 20px;
    top: 0;
    right: 0;
    background-color: #fff;
    z-index: 456;
  }
}
</style>
