<!--
   @description 引用工具 视频播放
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月02日 17:50:47
-->

<template>
  <CommonPage showFooter>
    <vue3VideoPlay v-bind="options" />
    <DataTable
      class="mt-20"
      :data="tableData"
      :maxHeight="200"
      :columns="columns"
      @done="tableMonted"
    />
  </CommonPage>
</template>

<script lang="ts" setup>
import { getVideoManageList } from '@/api/retention'
import CommonPage from '@/components/CommonPage.vue'
import DataTable from '@/components/DataTable.vue'
import {
  vue3VideoPlayControlBtns,
  type VideoTableColumn,
  type vue3VideoPlayOptions
} from '@/utils/typeset'
import { NButton, type DataTableInst } from 'naive-ui'
import { h, onMounted, ref } from 'vue'

defineOptions({
  name: 'VideoManage'
})

const tableData = ref<VideoTableColumn[]>([])

const options = ref<vue3VideoPlayOptions>({
  width: '800px',
  height: '400px',
  color: '#409eff',
  title: '',
  src: '',
  muted: false,
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'],
  autoPlay: false,
  loop: false,
  mirror: false,
  ligthOff: false,
  volume: 0.3,
  control: true,
  controlBtns: [
    vue3VideoPlayControlBtns.audioTrack,
    vue3VideoPlayControlBtns.quality,
    vue3VideoPlayControlBtns.speedRate,
    vue3VideoPlayControlBtns.volume,
    vue3VideoPlayControlBtns.setting,
    vue3VideoPlayControlBtns.pip,
    vue3VideoPlayControlBtns.pageFullScreen,
    vue3VideoPlayControlBtns.fullScreen
  ]
})

const columns = ref([
  {
    title: '序号',
    key: 'no',
    sorter: (row1: VideoTableColumn, row2: VideoTableColumn) => row1.no - row2.no
  },
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '上传日期',
    key: 'uploadTime'
  },
  {
    title: '文件大小',
    key: 'size'
  },
  {
    title: '操作',
    key: 'actions',
    render(row: VideoTableColumn) {
      return [
        h(
          NButton,
          {
            type: 'error',
            class: 'mr-10'
          },
          { default: () => '删除' }
        ),
        h(
          NButton,
          {
            type: 'warning'
          },
          { default: () => '导出' }
        )
      ]
    }
  }
])

const dataTable = ref()

const tableMonted = (val: DataTableInst) => {
  dataTable.value = val
}

const fetchData = async () => {
  const { code, data } = await getVideoManageList()
  if (code !== 200) return
  tableData.value = data
}

onMounted(() => {
  fetchData()
})
</script>
