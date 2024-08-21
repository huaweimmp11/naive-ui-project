<template>
  <div class="wh-full flex">
    <LockScreenPage v-if="showLock" />
    <div class="wh-full flex" v-else>
      <aside
        class="flex-col flex-shrink-0 transition-width-300"
        :class="appStore.collapsed ? 'w-64' : 'w-220'"
        border-r="1px solid light_border dark:dark_border"
      >
        <NormalSidbar />
      </aside>
      <article class="w-0 flex-col flex-1">
        <NormalHeader class="h-60 flex-shrink-0" />
        <slot />
      </article>
      <Music />
      <ImBox @mousedown="startClick" @mouseup="endClick" @click.prevent="openImBoX" />
      <ImBoxDialog ref="imBoxDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NormalHeader from './normalheader/NormalHeader.vue'
import NormalSidbar from './normalsidbar/NormalSidbar.vue'
import { useAppStore } from '@/store/modules/app'
import Music from '@/views/Music/Music.vue'
import ImBox from '@/views/ImBox/ImBox.vue'
import ImBoxDialog from '@/views/ImBox/ImBoxDialog/ImBoxDialog.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { io } from 'socket.io-client'
import { useUserStore } from '@/store/modules/user'
import { useScreenLockStore } from '@/store/modules/screenLock'
import LockScreenPage from '../components/LockScreen/LockScreenPage.vue'

defineOptions({
  name: 'NorMal'
})

const appStore = useAppStore()

const imBoxDialog = ref<any>(null)

const isLongPress = ref(false)

const userStore = useUserStore()

const useScreenLock = useScreenLockStore()

const isLock = computed(() => useScreenLock.isLocked as unknown as boolean)

const showLock = ref(false)

watch(
  () => isLock.value,
  (val: boolean) => {
    showLock.value = val
  },
  { immediate: true }
)

const startClick = () => {
  isLongPress.value = false
  setTimeout(() => {
    isLongPress.value = true
  }, 200)
}

const endClick = () => {
  if (isLongPress.value) return
}

const openImBoX = () => {
  if (!isLongPress.value) imBoxDialog.value.show()
}

const socket = ref<any>(null)

onMounted(() => {
  socket.value = io('http://localhost:1025/', {
    query: {
      userName: (userStore.userInfo as any).username
    }
  })
  if ((userStore.userInfo as any).username)
    socket.value.emit('user_name', (userStore.userInfo as any).username)
  socket.value.on('connect', () => {
    console.log('连接成功')
  })
  socket.value.on('connectionSuccess', () => {
    console.log('服务器确认连接成功')
  })
  socket.value.on('connect_error', (error: any) => {
    console.error('连接失败:', error)
  })
  socket.value.on('disconnect', (reason: any) => {
    console.log('断开连接:', reason)
  })
})
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
