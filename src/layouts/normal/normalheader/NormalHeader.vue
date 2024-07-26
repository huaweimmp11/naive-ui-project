<!--
   @description layout 头部
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月25日 17:50:07
-->

<template>
  <AppCard class="flex items-center px-12" border-b="1px solid light_border dark:dark_border">
    <MenuCollapse />
    <AppTab class="w-0 flex-1 px-12" />
    <span class="mx-6 opacity-20">|</span>
    <div class="flex flex-shrink-0 items-center px-12 text-18">
      <ToggleWaterMark class="mr-8" />
      <ToggleTheme />
      <FullScreen />
      <i class="i-fe:github mr-16 cursor-pointer" @click="handleLinkClick('')" />
      <i class="i-me:gitee mr-16 cursor-pointer" @click="handleLinkClick('')" />
      <ThemeSetting class="mr-16" />
      <UserAvatar />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import ToggleTheme from '@/components/ToggleTheme.vue'
import AppCard from '@/components/AppCard.vue'
import ThemeSetting from '@/components/ThemeSetting.vue'
import ToggleWaterMark from '@/components/ToggleWaterMark.vue'
import { AppTab, FullScreen, MenuCollapse, UserAvatar } from '@/layouts/components'

defineOptions({
  name: 'NormalHeader'
})

function handleLinkClick(link: string) {
  window.open(link)
}
</script>
