<!--
   @description 二维码展示
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月25日 16:23:09
-->

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <img :src="qrCodeImage" alt="QR Code" />
      </template>
      <n-gradient-text gradient="linear-gradient(90deg, #eb0a0a, #18fbec)"
        >1. 确保本地服务器监听iPV4地址接口</n-gradient-text
      >
      <br />
      <n-gradient-text gradient="linear-gradient(90deg, #18fbec, #eb0a0a)"
        >2. 确保你的电脑和手机连接在同一个局域网内</n-gradient-text
      >
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import axios from '@/utils/axios'
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'QrCode'
})

const qrCodeImage = ref<string>('')

const privateIP = ref<string>('')

async function getPrivateIP() {
  try {
    const { data } = await axios({
      url: '/private-ip',
      method: 'get'
    })
    privateIP.value = data
  } catch (error) {
    console.error('获取私有IP失败:', error)
    privateIP.value = '获取失败'
  }
}

const generateQRCode = async () => {
  try {
    const port = import.meta.env.VITE_PORT
    const url = `http://${privateIP.value}:${port}`
    QRCode.toDataURL(url, (err: any, url: string) => {
      if (err) {
        console.error('Failed to generate QR Code', err)
        return
      }
      qrCodeImage.value = url
    })
  } catch (error) {
    console.error('Failed to generate QR Code', error)
  }
}

onMounted(async () => {
  await getPrivateIP()
  generateQRCode()
})
</script>
