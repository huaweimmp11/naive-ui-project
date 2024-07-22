<!-- 
   @description 页面包裹组件，可以在 window 对象上挂载全局属性或方法
   @author s120
   @createDate 2023年12月15日 14:10:19
 -->
<template>
  <div class="global-wrapper">
    <n-config-provider :theme="theme">
      <n-layout content-style="padding: 0px 10px">
        <!-- <n-layout-header class="global-wrapper-header">
          <n-space justify="end">
            切换颜色主题
            <n-switch v-model:value="themeActive">
              <template #checked> 浅色 </template>
              <template #unchecked> 深色 </template></n-switch
            >
            控制水印
            <n-switch v-model:value="waterMarkActive">
              <template #checked> 开启水印 </template>
              <template #unchecked> 关闭水印 </template></n-switch
            >
          </n-space>
        </n-layout-header> -->
        <n-layout-content>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </n-layout-content>
        <!-- <n-layout-footer align="center">footer footer</n-layout-footer> -->
      </n-layout>
      <!-- <WaterMark v-if="waterMarkActive" /> -->
    </n-config-provider>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useDialog, useMessage, useNotification, useLoadingBar, darkTheme } from 'naive-ui'
import HomeView from './views/HomeView.vue'
import WaterMark from './components/WaterMark.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Global',
  components: {
    HomeView,
    WaterMark
  },
  setup() {
    const theme = computed(() => {
      if (themeActive.value) return null
      return darkTheme
    })

    const themeActive = ref(true)
    const waterMarkActive = ref(true)

    // message.d.ts 全局挂载配置
    window.$message = useMessage()
    window.$dialog = useDialog() as any
    window.$notify = useNotification()
    window.$loadingBar = useLoadingBar()

    return { darkTheme, theme, themeActive, waterMarkActive }
  }
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
