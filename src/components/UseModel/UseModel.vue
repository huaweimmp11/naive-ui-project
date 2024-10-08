<!--
   @description 模态框
   @author slh   
   @createDate 2024年08月01日 10:07:36
   @document https://www.naiveui.com/zh-CN/os-theme/components/modal#basic.vue
-->

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :title="defaultViews.title"
    :size="defaultViews.size"
    :style="{
      width: defaultViews.width,
      height: defaultViews.height,
      'align-self': 'flex-start',
      margin: defaultViews.top ? `${defaultViews.top}px auto` : 'auto'
    }"
    transform-origin="center"
    :bordered="defaultViews.bordered"
    :segmented="defaultViews.segmented"
    :mask-closable="false"
    :auto-focus="false"
    :on-after-enter="props.icOpened"
    :closable="defaultViews.closable"
  >
    <template #header-extra>
      <slot name="header-extra" />
    </template>
    <n-skeleton v-if="props.loading" text width="60%" />
    <slot v-else />
    <template #footer v-if="defaultViews.showFooter">
      <n-space style="justify-content: flex-end">
        <n-button type="primary" @click="handleClose">关闭</n-button>
        <n-button type="success" @click="handleConfirm">确认</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ModelStatus } from '@/utils/typeset'
import { ref } from 'vue'

type ShowOptions = {
  title?: string
  size?: string
  bordered?: boolean
  segmented?: {
    content: string
    footer: string
  }
  width?: string
  height?: string
  closable?: boolean
  showFooter?: boolean
  fullscreen?: boolean
  top?: number
}

defineOptions({
  name: 'UseModel'
})

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  icOpened: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['call'])

const showModal = ref<Boolean>(false)

const defaultViews = ref<ShowOptions>({
  title: '标题',
  size: 'huge',
  bordered: false,
  segmented: {
    content: 'soft',
    footer: 'soft'
  },
  width: '60%',
  height: 'auto',
  closable: false,
  showFooter: true,
  fullscreen: false,
  top: 0
})

const show = (options: ShowOptions) => {
  showModal.value = true
  defaultViews.value = { ...defaultViews.value, ...options }
  if (defaultViews.value.fullscreen) {
    defaultViews.value.width = '100vw'
    defaultViews.value.height = '100vh'
  }
}

const hide = () => {
  showModal.value = false
}

const handleConfirm = (e: MouseEvent) => {
  emit('call', ModelStatus.Confirmed)
}

const handleClose = () => {
  showModal.value = false
  emit('call', ModelStatus.Close)
}

defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped></style>
