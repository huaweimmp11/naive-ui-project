import { defineStore } from 'pinia'

// 长时间不操作默认锁屏时间，默认3分钟
const initTime = 3 * 60

const isLocked = localStorage.getItem('IS_SCREENLOCKED')

export const useScreenLockStore = defineStore('lockscreen', {
  state: () => ({
    isLocked: isLocked, // 是否锁屏
    lockTime: isLocked == 'true' ? initTime : 0
  }),
  getters: {},
  actions: {
    setLock(payload) {
      this.isLocked = payload
      window.localStorage.setItem('IS_SCREENLOCKED', this.isLocked)
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload
    }
  }
})
