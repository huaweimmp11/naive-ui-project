<template>
  <i
    class="mr-16 cursor-pointer"
    :class="isFullscreen ? 'i-fe:minimize' : 'i-fe:maximize'"
    @click="toggle"
  />
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'FullScreen'
})

const { isFullscreen, toggle } = useFullscreen()
</script>
