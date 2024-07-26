<!-- 
   @description 卡片组件
   @author s120
   @createDate 2023年12月15日 10:50:19
   @document https://www.naiveui.com/zh-CN/light/components/card
 -->

<template>
  <div
    class="message-card auto-bg"
    :style="{
      width: `100%`,
      height: `${props.height}px`
    }"
  >
    <n-card
      ref="nCardRef"
      :size="props.size"
      :hoverable="props.hoverable"
      :bordered="props.bordered"
      :closable="props.closable"
      :style="{
        width: `100%`,
        height: `100%`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }"
      :segmented="{
        content: props.contentSegmented,
        footer: props.footerSegmented
      }"
      @close="props.handleClose"
    >
      <template #header>
        <n-skeleton v-if="props.loading" text width="60%" />
        <template v-else>{{ props.title }}</template>
      </template>
      <!-- 可以放置卡片封面 -->
      <template #cover>
        <slot name="card-cover"></slot>
      </template>
      <!-- 卡片主体内容 -->
      <n-skeleton v-if="props.loading" text width="100%" />
      <slot v-else></slot>
      <!-- 卡片副标题 -->
      <template #header-extra>
        <slot name="header-extra"></slot>
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
  loading: {
    type: Boolean,
    default: false
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
  height: {
    type: Number,
    default: 240
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

<style lang="scss" scoped>
.message-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
