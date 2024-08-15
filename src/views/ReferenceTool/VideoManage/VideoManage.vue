<!--
   @description 引用工具 视频播放
   @author slh   
   @createDate 2024年08月02日 17:50:47
-->

<template>
  <CommonPage showFooter>
    <div class="flex justify-around items-start">
      <n-card class="w-[40%] h-full">
        <template #header>
          <n-tag type="info"> vue3-video-play </n-tag>
        </template>
        <n-form ref="formRef" :model="options" label-placement="left">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="20" label="视频地址">
              <n-input v-model:value="options.src" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="20" label="视频播放控件"> </n-form-item-gi>
            <n-form-item-gi :span="4"></n-form-item-gi>
            <!-- 音轨切换按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="音轨切换按钮">
              <n-switch v-model:value="defaultOptions.audioTrack" />
            </n-form-item-gi>
            <!-- 画中画按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="画中画按钮">
              <n-switch v-model:value="defaultOptions.pip" />
            </n-form-item-gi>
            <!-- 速率切换按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="速率切换按钮">
              <n-switch v-model:value="defaultOptions.speedRate" />
            </n-form-item-gi>
            <!-- 设置按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="设置按钮">
              <n-switch v-model:value="defaultOptions.setting" />
            </n-form-item-gi>
            <!-- 全屏按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="全屏按钮">
              <n-switch v-model:value="defaultOptions.fullScreen" />
            </n-form-item-gi>
            <!-- 网页全屏按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="网页全屏按钮">
              <n-switch v-model:value="defaultOptions.pageFullScreen" />
            </n-form-item-gi>
            <!-- 音量按钮 -->
            <n-form-item-gi :span="2"></n-form-item-gi>
            <n-form-item-gi :span="22" label="音量按钮">
              <n-switch v-model:value="defaultOptions.volume" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <template #footer>
          <n-tag type="info"> https://codelife.cc/vue3-video-play/ </n-tag>
        </template>
      </n-card>
      <vue3VideoPlay v-bind="options" v-if="torefresh" />
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import CommonPage from '@/components/CommonPage.vue'
import { vue3VideoPlayControlBtns, type vue3VideoPlayOptions } from '@/utils/typeset'
import { computed, ref, watch } from 'vue'

defineOptions({
  name: 'VideoManage'
})

const torefresh = ref(true)

const vue3VideoPlayControlBtnsMap = {
  quality: vue3VideoPlayControlBtns.quality,
  speedRate: vue3VideoPlayControlBtns.speedRate,
  volume: vue3VideoPlayControlBtns.volume,
  setting: vue3VideoPlayControlBtns.setting,
  pip: vue3VideoPlayControlBtns.pip,
  pageFullScreen: vue3VideoPlayControlBtns.pageFullScreen,
  fullScreen: vue3VideoPlayControlBtns.fullScreen
}

const options = computed(() => {
  const controlBtns: (typeof vue3VideoPlayControlBtns)[] = []
  for (const k in defaultOptions.value) {
    if (defaultOptions.value[k]) {
      controlBtns.push((vue3VideoPlayControlBtnsMap as unknown as any)[k])
    }
  }
  return {
    width: '800px',
    height: '400px',
    color: '#409eff',
    title: '',
    src: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
    webFullScreen: false,
    speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'],
    autoPlay: false,
    loop: false,
    mirror: false,
    ligthOff: false,
    volume: 0,
    control: true,
    controlBtns
  } as unknown as vue3VideoPlayOptions
})

const defaultOptions = ref<any>({
  audioTrack: true,
  quality: true,
  speedRate: true,
  volume: true,
  pip: true,
  pageFullScreen: true,
  fullScreen: true
})

watch(
  () => options.value,
  (val) => {
    torefresh.value = false
    setTimeout(() => {
      torefresh.value = true
    }, 0)
  },
  { deep: true }
)
</script>
