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
    <Music />
    <ImBox @mousedown="startClick" @mouseup="endClick" @click.prevent="openImBoX" />
    <ImBoxDialog ref="imBoxDialog" />
  </div>
</template>

<script setup lang="ts">
import NormalHeader from './normalheader/NormalHeader.vue'
import NormalSidbar from './normalsidbar/NormalSidbar.vue'
import { useAppStore } from '@/store/modules/app'
import Music from '@/views/Music/Music.vue'
import ImBox from '@/views/ImBox/ImBox.vue'
import ImBoxDialog from '@/views/ImBox/ImBoxDialog/ImBoxDialog.vue'
import { ref } from 'vue'

defineOptions({
  name: 'NorMal'
})

const appStore = useAppStore()

const imBoxDialog = ref<any>(null)

const isLongPress = ref(false)

const startClick = () => {
  isLongPress.value = false
  setTimeout(() => {
    isLongPress.value = true
  }, 200)
}

const endClick = () => {
  if (isLongPress.value) return
}

const openImBoX = () => {
  if (!isLongPress.value) imBoxDialog.value.show()
}
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
