<!--
   @description 编辑器 MarkDown
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月29日 15:00:26
-->

<template>
  <CommonPage showFooter>
    <MessageCard :height="820" title="">
      <MdEditor v-model="text" :theme="theme" />
      <div class="mt-10 flex gap-20">
        <n-button size="small" @click="saveMd">保存</n-button>
        <n-button size="small" type="primary" @click="exportMd">导出</n-button>
      </div>
      <DataTable />
    </MessageCard>
  </CommonPage>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { ref, h, onMounted, computed } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import CommonPage from '@/components/CommonPage.vue'
import { download } from '@/utils/func'
import MessageCard from '@/components/MessageCard.vue'
import { NButton } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import DataTable from '@/components/DataTable.vue'
import { getMarkDownList, addMarkDownToList } from '@/api/retention'

defineOptions({
  name: 'MarkDown'
})

const text = ref<string>('')

const appStore = useAppStore()

const theme = computed(() => {
  return appStore.isDark ? 'dark' : 'light'
})

const saveMd = async () => {
  if (!text.value) {
    window.$message.warning('请输入内容')
    return
  }
  const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const { code } = await addMarkDownToList({
    id: uuidv4(),
    content: JSON.stringify(text.value),
    createTime
  })
  if (code !== 200) {
    window.$message.error('保存失败')
    return
  }
  window.$message.success('保存成功')
  fetchData()
}

const exportMd = () => {}

const fetchData = async () => {
  const { code, data } = await getMarkDownList()
  if (code !== 200) return
  data.value = data
}

onMounted(() => {
  fetchData()
})
</script>
