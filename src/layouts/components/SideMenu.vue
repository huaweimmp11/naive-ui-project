<!--
   @description 侧边栏菜单
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月24日 13:58:04
-->

<template>
  <n-menu
    ref="menu"
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :collapsed="appStore.collapsed"
    :options="permissionStore.menus"
    :value="activeKey"
  />
</template>

<script setup>
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { nextTick } from 'vue'

defineOptions({
  name: 'SideMenu'
})

const route = useRoute()

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const activeKey = computed(() => route.meta?.parentKey || route.name)

const menu = ref(null)

watch(route, async () => {
  await nextTick()
  menu.value?.showOption()
})
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 8px;
      right: 8px;
    }
    &.n-menu-item-content--selected::before {
      border-left: 4px solid rgb(var(--primary-color));
    }
  }
}
</style>
