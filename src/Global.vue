<!-- 
   @description 页面包裹组件，可以在 window 对象上挂载全局属性或方法
   @author s120
   @createDate 2023年12月15日 14:10:19
 -->

<template>
  <div class="global-wrapper">
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <KeepAlive :include="keepAliveNames">
          <component :is="Component" v-if="!tabStore.reloading" :key="curRoute.fullPath" />
        </KeepAlive>
      </component>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDialog, useMessage, useNotification, useLoadingBar } from 'naive-ui'
import { useTabStore } from '@/store/modules/tab'
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
  return tabStore.tabs.filter((item: any) => item.keepAlive).map((item: any) => item.name)
})

// message.d.ts 全局挂载配置
window.$message = useMessage()
window.$dialog = useDialog() as any
window.$notify = useNotification()
window.$loadingBar = useLoadingBar()

const layouts = new Map()

function getLayout(name: string) {
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/${name}.vue`)))
  layouts.set(name, layout)
  return layout
}
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
