<!-- 
   @description 目前只是一个测试主页
   @author s120
   @createDate 2023年12月15日 15:19:19
 -->

<template>
  <div class="home-view">
    <MessageCard>
      <template #card-body>
        <n-button @click="handleClick">Default</n-button>
      </template>
    </MessageCard>
  </div>
</template>

<script setup lang="ts">
import { baseNotify } from '@/utils/func'
import MessageCard from '@/components/MessageCard.vue'

defineOptions({
  name: 'HomeView'
})

const env = import.meta.env

function handleClick() {
  baseNotify()
  console.log(env)
}
</script>

<style lang="scss" scoped>
.home-view {
  height: 100%;
}
</style>
