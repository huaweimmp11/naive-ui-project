<!-- 
   @description 登录后跳转首页
   @author s120
   @createDate 2023年12月15日 15:19:19
 -->

<template>
  <AppPage show-footer>
    <div class="flex">
      <MessageCard class="min-w-200 w-30%" title="Welcome">
        <p class="mt-28 text-14 opacity-60">一个人几乎可以在任何他怀有无限热忱的事情上成功。</p>
        <p class="mt-12 text-right text-12 opacity-40">—— 查尔斯·史考伯</p>
      </MessageCard>
      <MessageCard class="ml-12 w-70%" title="✨ 欢迎使用 Vue Naive Admin 2.0">
        <template #header-extra>
          <a
            class="text-14 text-primary text-highlight hover:underline hover:opacity-80"
            href="https://isme.top"
            target="_blank"
          >
            isme.top
          </a>
        </template>

        <p class="opacity-60">
          这是一款极简风格的后台管理模板，包含前后端解决方案，前端使用 Vite + Vue3 + Pinia +
          Unocss，后端使用 Nestjs + TypeOrm +
          MySql，简单易用，赏心悦目，历经十几次重构和细节打磨，诚意满满！！
        </p>
        <footer class="mt-12 flex items-center justify-end">
          <n-button
            type="primary"
            ghost
            tag="a"
            href="https://docs.isme.top/web/#/624306705/188522224"
            target="__blank"
          >
            开发文档
          </n-button>
          <n-button
            type="primary"
            class="ml-12"
            tag="a"
            href="https://github.com/zclzone/vue-naive-admin/tree/2.x"
            target="__blank"
          >
            代码仓库
          </n-button>
        </footer>
      </MessageCard>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage.vue'
import MessageCard from '@/components/MessageCard.vue'

defineOptions({
  name: 'HomeView'
})

defineProps({
  full: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
