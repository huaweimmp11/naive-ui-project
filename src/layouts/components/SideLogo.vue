<!--
   @description layout 头部 logo
   @author slh   
   @createDate 2024年07月25日 22:20:58
-->

<template>
  <router-link class="h-60 f-c-c" to="/home-view">
    <div class="w-full flex items-center je">
      <TheLogo />
      <h2
        v-show="!appStore.collapsed"
        class="ml-10 max-w-140 flex-shrink-0 text-16 color-primary font-bold"
      >
        {{ title }}
      </h2>
    </div>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store/modules/app'
import TheLogo from '@/components/TheLogo.vue'

defineOptions({
  name: 'SideLogo'
})

const title = import.meta.env.VITE_TITLE

const appStore = useAppStore()
</script>
