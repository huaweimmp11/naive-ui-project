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
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useScreenLockStore } from './store/modules/screenLock'
import { useRoute } from 'vue-router'

const appStore = useAppStore()

watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark)
})

const useScreenLock: any = useScreenLockStore()

const route = useRoute()

const isLock = computed(() => useScreenLock.isLocked)

const lockTime = computed(() => useScreenLock.lockTime)

let timer = ref<any>(null as unknown as NodeJS.Timer)

const timekeeping = () => {
  if (timer.value) clearInterval(timer.value)
  if (route.name == 'login' || isLock.value) return
  // 设置不锁屏
  useScreenLock.setLock(false)
  // 重置锁屏时间
  useScreenLock.setLockTime()
  timer.value = setInterval(() => {
    // 锁屏倒计时递减
    useScreenLock.setLockTime(lockTime.value - 1)
    if (lockTime.value <= 0) {
      // 设置锁屏
      useScreenLock.setLock(true)
      return clearInterval(timer.value)
    }
  }, 1000)
}

onMounted(() => {
  document.addEventListener('mousedown', timekeeping)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', timekeeping)
})
</script>

<style scoped></style>
