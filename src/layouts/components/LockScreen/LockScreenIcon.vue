<!--
   @description 锁屏图标
   @author slh
   @createDate 2024年08月21日 10:28:21
-->

<template>
  <i class="mr-16 cursor-pointer i-fe:lock" @click="lockScreen" />
</template>

<script lang="ts" setup>
import { useScreenLockStore } from '@/store/modules/screenLock'

defineOptions({
  name: 'LockScreenIcon'
})

const useLockscreen = useScreenLockStore()

const lockScreen = () => {
  useLockscreen.setLock(true)
}
</script>
