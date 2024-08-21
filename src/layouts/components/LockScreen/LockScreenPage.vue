<!--
   @description 锁屏页面
   @author slh
   @createDate 2024年08月21日 13:45:43
-->

<template>
  <div
    :class="{ onLockLogin: state.showLogin }"
    class="lockscreen"
    @keyup="onLockLogin(true)"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!state.showLogin">
      <div class="lock-box">
        <div class="lock">
          <span class="lock-icon" title="解锁屏幕" @click="onLockLogin(true)">
            <i class="i-fe:unlock"></i>
          </span>
        </div>
      </div>
      <!--充电-->
      <LockRecharge
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
        :calc-charging-time="calcChargingTime"
      />
      <div class="local-time">
        <div class="time">{{ hour }}:{{ minute }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
      </div>
    </template>
    <!--登录-->
    <template v-if="state.showLogin">
      <div class="login-box">
        <n-avatar :size="128">
          <i class="i-fe:user"></i>
        </n-avatar>
        <div class="username">{{ state.loginParams.username }}</div>
        <n-input
          type="password"
          autofocus
          v-model:value="state.loginParams.password"
          @keyup.enter="onLogin"
          placeholder="请输入登录密码"
        >
          <template #suffix>
            <i class="i-fe:arrow-right" @click="onLogin" style="cursor: pointer"></i>
          </template>
        </n-input>
        <div class="flex w-full" v-if="state.isLoginError">
          <span class="text-red-500">{{ state.errorMsg }}</span>
        </div>
        <div class="flex justify-around w-full mt-1">
          <div><a @click="state.showLogin = false">返回</a></div>
          <div><a @click="goLogin">重新登录</a></div>
          <div><a @click="onLogin">进入系统</a></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useScreenLockStore } from '@/store/modules/screenLock'
import { useUserStore } from '@/store/modules/user'
import { useBattery } from '@/utils/useBattery'
import { useTime } from '@/utils/useTime'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { getLoginData } from '@/api/retention'
import LockRecharge from './LockRecharge.vue'

defineOptions({
  name: 'LockScreenPage'
})

const useScreenLock = useScreenLockStore()

const userStore = useUserStore()

const appStore = useAppStore()

const { month, day, hour, minute, second, week } = useTime()

const router = useRouter()

const { battery, batteryStatus, calcDischargingTime, calcChargingTime } = useBattery()

const state = reactive({
  showLogin: false,
  loginLoading: false, // 正在登录
  isLoginError: false, //密码错误
  errorMsg: '密码错误',
  loginParams: {
    username: userStore.userInfo.username || '',
    password: ''
  }
})

/** 解锁登录 */
const onLockLogin = (value: boolean) => (state.showLogin = value)

/** 登录 */
const onLogin = async () => {
  if (!state.loginParams.password.trim()) {
    return
  }
  state.loginLoading = true
  const { code, message } = await getLoginData({ ...state.loginParams })
  if (code !== 200) {
    window.$message.error(`${message}`)
    state.isLoginError = true
    state.errorMsg = `${message}`
    return false
  } else {
    onLockLogin(false)
    window.$message.success(`登录成功`)
    useScreenLock.setLock(false)
  }
  state.loginLoading = false
}

/** 重新登录 */
const goLogin = () => {
  onLockLogin(false)
  useScreenLock.setLock(false)
  // 停止播放音乐 ap.pause()
  if (appStore.musicAp) appStore.musicAp.pause()
  localStorage.clear()
  sessionStorage.clear()
  window.$message.success('已退出登录')
  router.replace({
    path: '/login'
  })
}
</script>

<style lang="less" scoped>
.lockscreen {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background: #000;
  color: white;
  overflow: hidden;
  z-index: 10;
  &.onLockLogin {
    background-color: rgba(25, 28, 34, 0.88);
    backdrop-filter: blur(7px);
  }
  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin-bottom: 14px;
    }
    .username {
      font-size: 30px;
    }
  }
  .lock-box {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 34px;
    z-index: 10;
    .tips {
      color: white;
      cursor: text;
    }
    .lock {
      display: flex;
      justify-content: center;
      .lock-icon {
        cursor: pointer;
        .anticon-unlock {
          display: none;
        }
        &:hover .anticon-unlock {
          display: initial;
        }
        &:hover .anticon-lock {
          display: none;
        }
      }
    }
  }
  .local-time {
    position: absolute;
    bottom: 60px;
    left: 60px;
    font-family: helvetica;
    .time {
      font-size: 70px;
    }
    .date {
      font-size: 40px;
    }
  }
  .computer-status {
    position: absolute;
    bottom: 60px;
    right: 60px;
    font-size: 24px;
    > * {
      margin-left: 14px;
    }
    .network {
      position: relative;
      &.offline::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 28px;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: red;
        z-index: 10;
      }
    }
  }
}
</style>
