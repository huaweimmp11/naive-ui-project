<!--
   @description 编辑器 富文本
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月29日 13:48:55
-->

<template>
  <CommonPage showFooter>
    <MessageCard title="文章标题" size="small" :height="120" :contentSegmented="true">
      <n-input v-model:value="title" type="text" placeholder="请输入文章标题" />
    </MessageCard>
    <MessageCard title="文章内容" size="small" :height="520" :contentSegmented="true">
      <template #header-extra>
        <n-button type="primary" size="small" @click="getHtml" class="mr-8">获取HTML</n-button>
        <n-button type="warning" size="small" @click="getJson">获取JSON</n-button>
      </template>
      <RichTextEditor ref="richTextEditor" :height="400" @initialized="onInitialized" />
    </MessageCard>
    <n-card v-if="htmlContent" v-html="htmlContent"></n-card>
    <div v-if="jsonContent" class="margin-top padding priview-content">
      {{ jsonContent }}
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import MessageCard from '@/components/MessageCard.vue'
import RichTextEditor from './RichTextEditor/RichTextEditor.vue'

defineOptions({
  name: 'RichText'
})

const title = ref<string>('')

const htmlContent = ref<string>('')

const jsonContent = ref<string>('')

const richTextEditor = ref(null as any)

const getHtmlContent = ref<(() => string) | any>(null)

const getJsonContent = ref<(() => string) | any>(null)

const onInitialized = (methods: { getHtmlContent: () => string; getJsonContent: () => string }) => {
  getHtmlContent.value = methods.getHtmlContent
  getJsonContent.value = methods.getJsonContent
}

const getHtml = () => {
  htmlContent.value = getHtmlContent.value()
}

const getJson = () => {
  htmlContent.value = getJsonContent.value()
}
</script>
