<template>
  <div class="wh-full flex">
    <aside
      class="flex-col flex-shrink-0 transition-width-300"
      :class="appStore.collapsed ? 'w-64' : 'w-220'"
      border-r="1px solid light_border dark:dark_border"
    >
      <SideBar />
    </aside>

    <article class="w-0 flex-col flex-1">
      <AppHeader class="h-60 flex-shrink-0" />
      <div class="p-12" border-b="1px solid light_border dark:dark_border">
        <AppTab class="flex-shrink-0" />
      </div>
      <slot />
    </article>
  </div>
</template>

<script setup lang="ts">
import SideBar from './sidebar/fullsidebar.vue'
import AppHeader from './header/fullheader.vue'
import { useAppStore } from '@/store/modules/app'
import { AppTab } from '@/layouts/components'

defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Full'
})

const appStore = useAppStore()
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
