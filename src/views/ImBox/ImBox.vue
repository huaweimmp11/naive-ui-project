<!--
   @description 即时通讯组件
   @author slh   
   @createDate 2024年08月12日 10:38:41
   @document https://github.com/kirillmurashov/vue-drag-resize
-->

<template>
  <Vue3DraggableResizable
    :style="cssVars"
    class="im-box flex jc"
    :isActive="true"
    :initW="50"
    :initH="50"
    v-model:x="position.x"
    v-model:y="position.y"
    v-model:w="position.w"
    v-model:h="position.h"
    :resizable="false"
    :draggable="true"
    :lockAspectRatio="true"
  >
    <i class="i-fe:message-square color-fff" />
  </Vue3DraggableResizable>
</template>

<script lang="ts" setup>
import Vue3DraggableResizable from '@v3e/vue3-draggable-resizable'
import '@v3e/vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'ImBox'
})

const position = ref({
  x: 0,
  y: 0,
  w: 50,
  h: 50
})

const cssVars = computed(() => {
  return {
    '--background-color': useAppStore().primaryColor
  }
})

onMounted(() => {
  const pageWidth = window.innerWidth
  const pageHeight = window.innerHeight
  position.value.x = pageWidth - position.value.w
  position.value.y = pageHeight - position.value.h - 60
})
</script>

<style lang="scss" scoped>
.im-box {
  background-color: var(--background-color);
  border-radius: 50%;
  align-items: center;
}
</style>
