<template>
  <div class="wh-full flex">
    <aside
      class="flex-col flex-shrink-0 transition-width-300"
      :class="appStore.collapsed ? 'w-64' : 'w-220'"
      border-r="1px solid light_border dark:dark_border"
    >
      <NormalSidbar />
    </aside>
    <article class="w-0 flex-col flex-1">
      <NormalHeader class="h-60 flex-shrink-0" />
      <slot />
    </article>
  </div>
</template>

<script setup lang="ts">
import NormalHeader from './normalheader/NormalHeader.vue'
import NormalSidbar from './normalsidbar/NormalSidbar.vue'
import { useAppStore } from '@/store'

defineOptions({
  name: 'NorMal'
})

const appStore = useAppStore()
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
