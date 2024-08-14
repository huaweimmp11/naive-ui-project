<!--
   @description 主页 天气 使用心知天气插件
   @author slh   
   @createDate 2024年08月08日 17:39:15
   @document https://www.seniverse.com/widgetv3
-->

<template>
  <div id="tp-weather-widget"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import './Weather'

const loadScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `//cdn.sencdn.com/widget2/static/js/bundle.js?t=${parseInt((new Date().getTime() / 100000000).toString(), 10)}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load script'))
    document.head.appendChild(script)
  })
}

onMounted(() => {
  loadScript().then(() => {
    const checkWidget = () => {
      if (typeof (window as any).SeniverseWeatherWidget === 'function') {
        ;(window as any).SeniverseWeatherWidget('show', {
          flavor: 'slim',
          location: 'WX4FBXXFKE4F',
          geolocation: true,
          language: 'auto',
          unit: 'c',
          theme: 'auto',
          token: '83029fbd-b2de-4b6a-baef-2e43554b2975',
          /** 展开 always enabled */
          hover: 'enabled',
          container: 'tp-weather-widget'
        })
      } else {
        setTimeout(checkWidget, 100)
      }
    }
    checkWidget()
  })
})
</script>

<style lang="scss">
#tp-weather-widget {
  .jCzPjW {
    padding: 0 10px;
  }
  .bcxaVF {
    font-size: 14px;
  }
}
</style>
