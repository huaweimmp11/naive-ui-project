<!--
   @description 登录页面
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月24日 14:49:12
-->

<template>
  <div class="wh-full flex-col bg-cover">
    <div
      class="m-auto max-w-700 min-w-345 f-c-c rounded-8 bg-opacity-20 bg-cover p-12 card-shadow auto-bg"
    >
      <div class="hidden w-380 px-20 py-35 md:block">
        <img :src="loginBanner" class="w-full" alt="login_banner" />
      </div>
      <div class="w-320 flex-col px-20 py-32 pt-0">
        <h2 class="f-c-c text-24 text-#6a6a6a font-normal">
          <img :src="loginSrc" class="mr-12 h-50" />
          {{ title }}
        </h2>
        <n-input
          v-model:value="loginInfo.username"
          autofocus
          class="mt-22 h-40 items-center"
          placeholder="请输入用户名"
          :maxlength="20"
        >
          <template #prefix>
            <i class="i-fe:user mr-12 opacity-20" />
          </template>
        </n-input>
        <n-input
          v-model:value="loginInfo.password"
          class="mt-20 h-40 items-center"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入密码"
          :maxlength="20"
          @keydown.enter="handleLogin()"
        >
          <template #prefix>
            <i class="i-fe:lock mr-12 opacity-20" />
          </template>
        </n-input>
        <div class="mt-40 flex items-center">
          <n-button
            class="ml-32 h-40 flex-1 rounded-5 text-16"
            type="info"
            secondary
            @click="handleLoginOnce"
          >
            一键
          </n-button>
          <n-button class="ml-32 h-40 flex-1 rounded-5 text-16" type="primary" @click="handleLogin">
            登录
          </n-button>
        </div>
      </div>
      <Vcode :show="isShow" @success="onSuccess" @close="onClose" successText="验证通过" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Vcode from 'vue3-puzzle-vcode'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouteName } from '@/router/routes/contants'
import { getLoginData } from '@/api/retention'
import loginBanner from '@/assets/images/login_banner.webp'
import loginSrc from '@/assets/images/logo.png'

defineOptions({
  name: 'LoginPage'
})

const title = ref(import.meta.env.VITE_TITLE)

/** 路由信息 */
const route = useRoute()

/** 路由实例 */
const router = useRouter()

const isShow = ref(false)

const loginInfo = ref({
  username: '',
  password: ''
})

function onSuccess() {
  isShow.value = false
  window.$message.success('登录成功')
  router.push({
    name: RouteName.HomeView
  })
}

function onClose() {
  isShow.value = false
  window.$message.warning('取消验证！')
}

onMounted(() => {})

async function handleLoginOnce() {
  const { code } = await getLoginData({ username: 'admin', password: '123456' })
  if (code !== 200) {
    window.$message.error('登录失败')
    return false
  }
  onSuccess()
}

async function handleLogin() {
  const { username, password } = loginInfo.value
  if (!username || !password) return window.$message.warning('请输入用户名和密码')
  const { code } = await getLoginData({ username, password })
  if (code !== 200) {
    window.$message.error('登录失败')
    return false
  }
  isShow.value = true
}
</script>
