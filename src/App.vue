<template>
  <n-config-provider
    class="wh-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="appStore.isDark ? darkTheme : undefined"
    :theme-overrides="appStore.naiveThemeOverrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <Global />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import Global from './Global.vue'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import { watchEffect } from 'vue'

const appStore = useAppStore()

watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark)
})
</script>

<style scoped></style>
