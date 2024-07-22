<!-- 
   @description 卡片组件
   @author s120
   @createDate 2023年12月15日 10:50:19
   @document https://www.naiveui.com/zh-CN/light/components/card
 -->

<template>
  <div
    class="message-card"
    :style="{
      width: `${width}px`
    }"
  >
    <n-card
      ref="nCardRef"
      :title="props.title"
      :size="props.size"
      :hoverable="props.hoverable"
      :bordered="props.bordered"
      :closable="props.closable"
      :style="{
        width: `${props.width}px`
      }"
      :segmented="{
        content: props.contentSegmented,
        footer: props.footerSegmented
      }"
      @close="props.handleClose"
    >
      <!-- 可以放置卡片封面 -->
      <template #cover>
        <slot name="card-cover"></slot>
      </template>
      <!-- 卡片主体内容 -->
      <slot name="card-body"></slot>
      <!-- 卡片副标题 -->
      <template #header-extra v-if="props.headerExtra">
        {{ props.headerExtra }}
      </template>
      <template #footer> <slot name="card-footer"></slot> </template>
      <!-- 卡片底部分割区域 -->
      <template #action> <slot name="card-action"></slot> </template>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MessageCard'
})

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  /** 卡片有 small、medium、large、huge 尺寸 */
  size: {
    type: String,
    default: 'medium'
  },
  /** 可悬浮 */
  hoverable: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 300
  },
  /** 卡片副标题 */
  headerExtra: {
    type: String,
    default: ''
  },
  /** 卡片边框 */
  bordered: {
    type: Boolean,
    default: true
  },
  /**
   * 卡片 content 分割线
   * @ true || false 有无分割线
   * @ 'soft' 缩略分割线
   */
  contentSegmented: {
    type: [Boolean, String],
    default: false
  },
  /**
   * 卡片 footer 分割线
   * @ true || false 有无分割线
   * @ 'soft' 缩略分割线
   */
  footerSegmented: {
    type: [Boolean, String],
    default: false
  },
  /** 卡片关闭按钮 */
  closable: {
    type: Boolean,
    default: false
  },
  /** 卡片关闭时间回调 */
  handleClose: {
    type: Function,
    default: null
  }
})

const nCardRef = ref(null)
</script>

<style lang="scss" scoped></style>
