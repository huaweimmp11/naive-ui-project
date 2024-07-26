<!--
   @description 文字超出省略号，鼠标移入提示完整文字
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月25日 14:00:07
-->

<template>
  <div class="card-tooltip">
    <div class="text-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <span ref="textRef" class="text">{{ text }}</span>
      <div v-if="isOverflowed && show" class="tooltip">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const textRef = ref<HTMLSpanElement | null>(null)
const show = ref(false)
const isOverflowed = ref(false)

const checkOverflow = () => {
  if (textRef.value) {
    isOverflowed.value = textRef.value.scrollWidth > textRef.value.clientWidth
  }
}

const showTooltip = () => {
  show.value = true
}

const hideTooltip = () => {
  show.value = false
}

onMounted(() => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOverflow)
})
</script>

<style lang="scss" scoped>
.card-tooltip {
  position: relative;
  display: inline-block;
}

.text-container {
  display: inline-block;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip {
  visibility: visible;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.9;
}
</style>
