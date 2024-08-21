/**
 *@description 检查网络是否可用
 *@author slh
 *@createDate 2024年08月21日 14:05:26
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useOnline() {
  const online = ref(true)
  const showStatus = (val: any) => {
    online.value = typeof val == 'boolean' ? val : val.target.online
  }
  navigator.onLine ? showStatus(true) : showStatus(false)
  onMounted(() => {
    window.addEventListener('online', showStatus)
    window.addEventListener('offline', showStatus)
  })
  onUnmounted(() => {
    window.removeEventListener('online', showStatus)
    window.removeEventListener('offline', showStatus)
  })
  return { online }
}
