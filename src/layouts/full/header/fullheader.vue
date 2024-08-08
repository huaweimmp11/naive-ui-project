<template>
  <AppCard class="flex items-center px-12" border-b="1px solid light_border dark:dark_border">
    <MenuCollapse />

    <BreadCrumb />

    <div class="ml-auto flex flex-shrink-0 items-center px-12 text-18">
      <ToggleTheme />

      <FullScreen />

      <i
        class="i-fe:github mr-16 cursor-pointer"
        @click="handleLinkClick('https://github.com/zclzone/vue-naive-admin/tree/2.x')"
      />
      <i
        class="i-me:gitee mr-16 cursor-pointer"
        @click="handleLinkClick('https://gitee.com/isme-admin/vue-naive-admin/tree/2.x')"
      />

      <ThemeSetting class="mr-16" />

      <UserAvatar />
    </div>
  </AppCard>
</template>

<script setup>
import ThemeSetting from '@/components/ThemeSetting.vue'
import BreadCrumb from '@/layouts/components/BreadCrumb.vue'
import FullScreen from '@/layouts/components/FullScreen.vue'
import MenuCollapse from '@/layouts/components/MenuCollapse.vue'
import UserAvatar from '@/layouts/components/UserAvatar.vue'
import AppCard from '@/components/AppCard.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'

defineOptions({
  name: 'FullHeader'
})

function handleLinkClick(link) {
  window.open(link)
}
</script>
