<!-- 
   @description 全局全屏水印
   @author s120
   @createDate 2023年12月15日 15:22:43
   @document https://www.naiveui.com/zh-CN/light/components/watermark
 -->

<template>
  <div class="water-mark-wrapper">
    <n-switch v-model:value="active" />
    <n-watermark
      v-if="active"
      :content="content"
      cross
      fullscreen
      :font-size="12"
      :line-height="16"
      :width="450"
      :height="450"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ToggleWaterMark'
})

const active = ref<boolean>(false)

const content = ref<string>(import.meta.env.VITE_TITLE)
</script>

<style lang="scss" scoped></style>
