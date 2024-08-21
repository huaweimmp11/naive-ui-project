/**
 *@description 锁屏页面获取本地时间
 *@author slh
 *@createDate 2024年08月21日 14:08:34
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  let timer: any
  const year = ref(0)
  const month = ref(0)
  const week = ref('')
  const day = ref(0)
  const hour = ref<number | string>(0)
  const minute = ref<number | string>(0)
  const second = ref(0)
  const updateTime = () => {
    const date = new Date()
    year.value = date.getFullYear()
    month.value = date.getMonth() + 1
    week.value = '日一二三四五六'.charAt(date.getDay())
    day.value = date.getDate()
    hour.value =
      (date.getHours() + '')?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours())
    minute.value =
      (date.getMinutes() + '')?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes())
    second.value = date.getSeconds()
  }
  updateTime()
  onMounted(() => {
    clearInterval(timer)
    timer = setInterval(() => updateTime(), 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  return { month, day, hour, minute, second, week }
}
