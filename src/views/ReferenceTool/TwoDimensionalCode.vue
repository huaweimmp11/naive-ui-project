<!--
   @description 引用工具 二维码
   @author slh   
   @createDate 2024年07月28日 16:22:26
-->

<template>
  <CommonPage>
    <div class="flex">
      <n-input
        v-model:value="qrText"
        class="flex-sub margin-lr"
        size="small"
        placeholder="请输入文本内容"
      />
      <n-button type="primary" @click="generatorCode">点击生成</n-button>
    </div>
    <div
      v-show="qrUrl"
      class="content-wrappar flex flex-direction justify-center items-center mt-10 gap-20"
    >
      <img ref="canvas" :src="qrUrl" class="canvas" />
      <div class="setting-wrapper margin-top">
        <div class="flex justify-center items-center margin-top gap-10">
          <n-button type="primary" @click="changeBgColor">更改背景色</n-button>
          <n-button type="warning" @click="changeFrColor">更改前景色</n-button>
          <n-button type="error" @click="restore">恢复原始状态</n-button>
        </div>
      </div>
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import Qrcode from 'qrcode'
import CommonPage from '@/components/CommonPage.vue'
import { ref } from 'vue'

defineOptions({
  name: 'TwoDimensionalCode'
})

const qrText = ref<string>('')

const qrUrl = ref<string>('')

const darkColor = ref<string>('#000000')

const lightColor = ref<string>('#ffffff')

const changeBgColor = () => {
  lightColor.value = '#ffff00'
  generatorCode()
}

const changeFrColor = () => {
  darkColor.value = '#ff0000'
  generatorCode()
}

const restore = () => {
  darkColor.value = '#000000'
  lightColor.value = '#ffffff'
  generatorCode()
}

const generatorCode = () => {
  if (!qrText.value) {
    window.$message.error('请输入二维码文本内容')
    return
  }
  Qrcode.toDataURL(qrText.value, {
    width: 250,
    color: {
      dark: darkColor.value,
      light: lightColor.value
    }
  }).then((res) => {
    qrUrl.value = res
  })
}
</script>

<style lang="scss" scoped>
.content-wrappar {
  flex-direction: column;
  .canvas {
    width: 250px !important;
    height: 250px !important;
    border: 2px solid #f5f5f5;
  }
}
</style>
