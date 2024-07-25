<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:46:06
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

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
