<!--
   @description layout 左部分
   @author slh   
   @createDate 2024年07月27日 15:53:23
-->

<template>
  <SideLogo border-b="1px solid light_border dark:dark_border" />
  <SideMenu class="cus-scroll-y mt-4 h-0 flex-1" />
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/components/SideMenu.vue'
import SideLogo from '@/layouts/components/SideLogo.vue'

defineOptions({
  name: 'NormalSidbar'
})
</script>
