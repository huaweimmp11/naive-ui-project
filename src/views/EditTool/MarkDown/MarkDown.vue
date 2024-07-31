<!--
   @description 编辑器 MarkDown
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月29日 15:00:26
-->

<template>
  <CommonPage showFooter>
    <MessageCard title="文章标题" size="small" :height="120" :contentSegmented="true">
      <n-input v-model:value="title" type="text" placeholder="请输入文章标题" />
    </MessageCard>
    <MessageCard :height="900" title="">
      <MdEditor v-model="text" :theme="theme" />
      <div class="mt-10 flex gap-20">
        <n-button size="small" @click="updataLock ? updateMd() : saveMd()">{{
          updataLock ? '更新保存' : '新增保存'
        }}</n-button>
      </div>
      <DataTable
        :data="tableData"
        class="mt-10"
        :maxHeight="200"
        :showAction="true"
        :columns="columns"
      />
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
import MessageCard from '@/components/MessageCard.vue'
import { NButton } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import DataTable from '@/components/DataTable.vue'
import {
  getMarkDownList,
  addMarkDownToList,
  updateMarkDownToList,
  exportMarkDownById
} from '@/api/retention'
import type { MarkDownTableColumn } from '@/utils/typeset'

defineOptions({
  name: 'MarkDown'
})

const text = ref<string>('')

const appStore = useAppStore()

const title = ref<string>('')

const tableData = ref<MarkDownTableColumn[]>([])

const columns = ref([
  {
    title: '序号',
    key: 'no'
  },
  {
    title: '标题',
    key: 'title'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'actions',
    render(row: MarkDownTableColumn) {
      return [
        h(
          NButton,
          {
            type: 'primary',
            class: 'mr-10',
            onClick: () => edit(row)
          },
          { default: () => '编辑' }
        ),
        h(
          NButton,
          {
            type: 'warning',
            onClick: () => exportMd(row)
          },
          { default: () => '导出' }
        )
      ]
    }
  }
])

const edit = (row: MarkDownTableColumn) => {
  updataLock.value = true
  text.value = row.content
  title.value = row.title
  currentRow.value = { ...row }
}

const currentRow = ref({} as MarkDownTableColumn as any)

const updataLock = ref(false)

const theme = computed(() => {
  return appStore.isDark ? 'dark' : 'light'
})

const saveMd = async () => {
  if (!title.value) {
    window.$message.warning('请输入标题')
    return
  }
  if (!text.value) {
    window.$message.warning('请输入内容')
    return
  }
  const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const res: any = await addMarkDownToList({
    id: uuidv4(),
    content: JSON.stringify(text.value),
    createTime,
    title: title.value
  })
  const { code, message } = res
  if (code !== 200) {
    window.$message.error(message)
  } else {
    window.$message.success(message)
  }
  resetOptions()
  fetchData()
}

const updateMd = async () => {
  const res: any = await updateMarkDownToList({
    ...currentRow.value,
    title: title.value,
    content: JSON.stringify(text.value)
  })
  const { code, message } = res
  if (code !== 200) {
    window.$message.error(message)
  } else {
    window.$message.success(message)
  }
  resetOptions()
  fetchData()
}

const exportMd = (row: MarkDownTableColumn) => {
  exportMarkDownById({
    id: row.id,
    filename: `${row.title}.md`
  })
}

const resetOptions = () => {
  text.value = ''
  title.value = ''
  updataLock.value = false
  currentRow.value = {}
}

const fetchData = async () => {
  const { code, data } = await getMarkDownList()
  if (code !== 200) return
  tableData.value = data
}

onMounted(() => {
  fetchData()
  resetOptions()
})
</script>
