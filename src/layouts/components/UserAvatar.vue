<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="flex cursor-pointer items-center">
      <n-avatar round :size="36" :src="userStore.avatar" />
      <div v-if="userStore.userInfo" class="ml-12 flex-col flex-shrink-0 items-center">
        <span class="text-14">{{ userStore.nickName ?? userStore.username }}</span>
        <span class="text-12 opacity-50">[{{ userStore.currentRole?.name }}]</span>
      </div>
    </div>
  </n-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { reactive } from 'vue'

const router = useRouter()

const userStore = useUserStore()

const authStore = useAuthStore()

const appStore = useAppStore()

const options = reactive([
  {
    label: '个人资料',
    key: 'profile',
    icon: () => h('i', { class: 'i-material-symbols:person-outline text-14' })
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-mdi:exit-to-app text-14' })
  }
])

function handleSelect(key) {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      window.$dialog.warning({
        title: '提示',
        content: '确认退出？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          try {
          } catch (error) {
            console.error(error)
          }
          authStore.logout()
          // 停止播放音乐 ap.pause()
          if (appStore.musicAp) appStore.musicAp.pause()
          window.$message.success('已退出登录')
        },
        onNegativeClick: () => {}
      })
      break
  }
}
</script>
