<!--
   @description 侧边栏路由菜单
   @author slh   
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
    :collapsed="false"
    :options="menus"
    :value="activeKey"
    :render-label="renderLabel"
    @update:value="handleMenuSelect"
  />
</template>

<script setup>
import { computed, ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { asyncRoutes } from '@/router/routes'
import SvgIcon from './SvgIcon.vue'

defineOptions({
  name: 'SideMenu'
})

const menus = computed(() => {
  return transformRoutesToMenuOptions(asyncRoutes)
})

const transformRoutesToMenuOptions = (routes) => {
  return routes.map((route) => {
    return {
      label: route.meta?.title,
      key: route.path,
      name: route.name,
      icon: route.meta?.icon ? () => h(SvgIcon, { name: route.meta.icon }) : null,
      children: route.children ? transformRoutesToMenuOptions(route.children) : undefined
    }
  })
}

const activeKey = ref(null)

const router = useRouter()

const renderLabel = ({ label }) => {
  return label
}

const handleMenuSelect = (key, item) => {
  activeKey.value = key
  router.push({
    name: item.name
  })
}
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    display: flex;
    align-items: center;
    &::before {
      left: 8px;
      right: 8px;
    }
    &.n-menu-item-content--selected::before {
      border-left: 4px solid rgb(var(--primary-color));
    }
    &__icon {
      height: 26px !important;
    }

    // 将图标和文本靠左排列
    .n-icon {
      margin-right: 8px; // 图标和文字间距
    }

    .n-menu-item-content-header {
      flex-grow: 1; // 占据剩余空间
      display: flex;
      align-items: center;
    }

    // 小箭头样式
    .n-menu-item-content-arrow {
      margin-left: auto; // 让箭头靠右对齐
    }
  }
}
</style>
