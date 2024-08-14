<!--
   @description 用于 SideMenu 组件中图标展示
   @author slh   
   @createDate 2024年07月26日 18:47:05
-->

<template>
  <div v-html="svgContent" class="icon"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})
const svgContent = ref('')

watchEffect(async () => {
  if (props.name) {
    try {
      const response = await fetch(
        new URL(`../../assets/icons/feather/${props.name}.svg`, import.meta.url)
      )
      svgContent.value = await response.text()
    } catch (error) {
      console.error(`Failed to load SVG icon: ${props.name}`, error)
      svgContent.value = null
    }
  }
})
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 100%;
  vertical-align: middle;
  transform: scale(0.7);
}
</style>
