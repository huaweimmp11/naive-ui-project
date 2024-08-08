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
      <i
        class="i-fe:github mr-16 cursor-pointer"
        @click="handleLinkClick('https://github.com/huaweimmp11/naive-ui-project')"
      />
      <i
        class="i-me:gitee mr-16 cursor-pointer"
        @click="handleLinkClick('https://gitee.com/s02s02/naive-ui-project')"
      />
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
import AppTab from '@/layouts/components/tab/AppTab.vue'
import FullScreen from '@/layouts/components/FullScreen.vue'
import MenuCollapse from '@/layouts/components/MenuCollapse.vue'
import UserAvatar from '@/layouts/components/UserAvatar.vue'

defineOptions({
  name: 'NormalHeader'
})

function handleLinkClick(link: string) {
  window.open(link)
}
</script>
