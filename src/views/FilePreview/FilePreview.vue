<!--
   @description 引用工具 文件预览
   @author slh
   @createDate 2024年08月15日 14:03:44
-->

<template>
  <CommonPage>
    <n-space>
      <n-button type="primary" @click="view('word')">PreviewWord</n-button>
      <n-button type="primary" @click="view('excel')">PreviewExcel</n-button>
      <n-button type="primary" @click="view('pdf')">PreviewPdf</n-button>
    </n-space>
    <n-modal v-model:show="dialogVisible">
      <n-card
        style="width: 100vw; height: 100vh; overflow: scroll"
        :title="'Preview ' + fileType"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <AsyncComponent v-if="fileType === 'word'" :key="'word'" :src="word" style="height: 100%" />
        <vue-office-excel
          v-if="fileType === 'excel'"
          :key="'excel'"
          :src="excel"
          style="height: 100%"
        />
        <vue-office-pdf
          v-else-if="fileType === 'pdf'"
          :key="'pdf'"
          :src="pdf"
          style="height: 100%"
        />
      </n-card>
    </n-modal>
  </CommonPage>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
// import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'

defineOptions({
  name: 'FilePreview'
})

const dialogVisible = ref(false)

const fileType = ref('')

const word = ref('/test.docx')

const excel = ref('/test.xlsx')

const pdf = ref('/test.pdf')

const view = (type: string) => {
  dialogVisible.value = true
  fileType.value = type
}

const AsyncComponent = defineAsyncComponent({
  loader: () => import('@vue-office/docx'),
  delay: 200,
  timeout: 3000
})
</script>
