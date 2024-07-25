<!-- 
   @description 页面包裹组件，可以在 window 对象上挂载全局属性或方法
   @author s120
   @createDate 2023年12月15日 14:10:19
 -->
<template>
  <div class="global-wrapper">
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme="appStore.isDark ? darkTheme : undefined"
      :theme-overrides="appStore.naiveThemeOverrides"
    >
      <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
        <component :is="Layout">
          <KeepAlive :include="keepAliveNames">
            <component :is="Component" v-if="!tabStore.reloading" :key="curRoute.fullPath" />
          </KeepAlive>
        </component>
      </router-view>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import {
  useDialog,
  useMessage,
  useNotification,
  useLoadingBar,
  darkTheme,
  dateZhCN,
  zhCN
} from 'naive-ui'
import { useTabStore } from '@/store'
import { useAppStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import { markRaw, defineAsyncComponent } from 'vue'

defineOptions({
  name: 'GloBal'
})

const appStore = useAppStore()

const route = useRoute()

if (appStore.layout === 'default') appStore.setLayout('')

const Layout = computed(() => {
  if (!route.matched?.length) return null
  return getLayout(route.meta?.layout || appStore.layout)
})

const tabStore = useTabStore()

const keepAliveNames = computed(() => {
  return tabStore.tabs.filter((item) => item.keepAlive).map((item) => item.name)
})

// message.d.ts 全局挂载配置
window.$message = useMessage()
window.$dialog = useDialog() as any
window.$notify = useNotification()
window.$loadingBar = useLoadingBar()

const layouts = new Map()

function getLayout(name) {
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/${name}.vue`)))
  layouts.set(name, layout)
  // 当前布局组件
  console.log('getlayout ', name, layouts, layout)
  return layout
}

watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark)
})
</script>

<style lang="scss" scoped>
.global-wrapper {
  width: 100vw;
  height: 100vh;
  .n-config-provider {
    height: 100%;
    .n-layout {
      height: 100%;
      .n-layout-scroll-container {
        .n-layout-content {
          height: calc(100% - 36px - 24px);
        }
      }
    }
  }
}
</style>
