<!--
   @description 文字超出省略号，鼠标移入提示完整文字
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月25日 14:00:07
-->

<template>
  <div class="card-tooltip">
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="text-container">
          <span ref="textRef" class="text">{{ props.text }}</span>
        </div>
      </template>
      {{ props.text }}
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const textRef = ref<HTMLElement | null>(null)

const showTooltip = () => {
  if (textRef.value) {
    textRef.value.style.overflow = 'hidden'
    textRef.value.style.textOverflow = 'ellipsis'
    textRef.value.style.whiteSpace = 'nowrap'
  }
}

const hideTooltip = () => {
  if (textRef.value) {
    textRef.value.style.overflow = ''
    textRef.value.style.textOverflow = ''
    textRef.value.style.whiteSpace = ''
  }
}

onMounted(() => {
  showTooltip()
})

onUnmounted(() => {
  hideTooltip()
})
</script>

<style scoped>
.card-tooltip {
  display: inline-block;
}

.text-container {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text {
  display: inline-block;
}
</style>
