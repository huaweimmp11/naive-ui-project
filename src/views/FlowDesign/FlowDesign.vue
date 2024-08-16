<!--
   @description 流程图设计
   @author slh
   @createDate 2024年08月16日 09:16:39
   @document https://07.logic-flow.cn/
-->

<template>
  <CommonPage showFooter>
    <n-button @click="exportImage">导出图片</n-button>
    <div id="container" class="w-full h-[92%]" :style="cssVars"></div>
  </CommonPage>
</template>

<script lang="ts" setup>
import CommonPage from '@/components/CommonPage.vue'
import LogicFlow from '@logicflow/core'
import { Control, DndPanel, Menu, Snapshot } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import '@logicflow/core/dist/index.css'
import { computed, onMounted, ref, watch } from 'vue'
import { getPatternItems, type BackgroundConfig, type GridOptions } from './PatternItems'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'FlowDesign'
})

const data = ref<any>({})

const lf = ref<LogicFlow>(null as unknown as LogicFlow)

const exportImage = () => {
  lf.value.getSnapshot()
}

// 具体配置项见文档 https://07.logic-flow.cn/api/logicFlowApi.html#constructor
const initFlow = () => {
  lf.value = new LogicFlow({
    container: document.querySelector('#container') as HTMLElement,
    background: {
      image:
        'https://dpubstatic.udache.com/static/dpubimg/8249498d-31a3-489c-ab25-ef8dffe8ec03.jpg',
      opacity: 1,
      size: '50%',
      position: 'top'
    } as BackgroundConfig,
    /** 禁止鼠标滚动移动画布 */
    stopScrollGraph: true,
    /** 禁止缩放画布 */
    stopZoomGraph: true,
    plugins: [Control, DndPanel, Menu, Snapshot],
    grid: {
      type: 'dot',
      size: 20
    } as GridOptions
  })
  lf.value.setPatternItems(getPatternItems(lf.value))
  lf.value.render(data.value)
}

const cssVars = computed(() => {
  return {
    '--text-color': useAppStore().primaryColor
  }
})

const lfSetTheme = () => {
  if (lf.value) {
    lf.value.setTheme({
      line: {
        stroke: useAppStore().primaryColor
      },
      polyline: {
        stroke: useAppStore().primaryColor
      }
    })
  }
}

watch(
  () => lf.value,
  (val) => {
    if (val) lfSetTheme()
  }
)

watch(
  () => useAppStore().primaryColor,
  (val) => {
    if (val) lfSetTheme()
  }
)

onMounted(() => {
  initFlow()
})
</script>

<style lang="scss" scoped>
:deep(.lf-graph) {
  background-color: var(--background-color);
}

:deep(.lf-dnd-text) {
  color: var(--text-color);
}

:deep(.lf-control-text) {
  color: var(--text-color);
}
</style>
