<!-- 
   @description 数据填充表格
   @author s120
   @createDate 2024年07月30日 09:50:19
 -->

<template>
  <n-data-table
    ref="tableRef"
    :columns="refColumns"
    :data="props.data"
    :pagination="props.showPagination"
    :single-column="props.rowSplitline"
    :single-line="props.columnSplitline"
    :striped="props.striped"
    :loading="props.loading"
    :max-height="props.maxHeight"
    :min-height="props.minHeight"
  >
  </n-data-table>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { DataTableInst } from 'naive-ui'

defineOptions({
  name: 'DataTable'
})

const emit = defineEmits(['done'])

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Object,
    require: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  /** 行分割线 */
  rowSplitline: {
    type: Boolean,
    default: false
  },
  /** 列分割线 */
  columnSplitline: {
    type: Boolean,
    default: false
  },
  /** 斑马线条纹 */
  striped: {
    type: Boolean,
    default: false
  },
  /**
   * 是否让表格主体的高度自动适应整个表格区域的高度
   * 打开这个选项会让 table-layout 始终为 'fixed'
   */
  flexHeight: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: [Number, String],
    default: undefined
  },
  minHeight: {
    type: [Number, String],
    default: undefined
  }
})

const refColumns = computed(() => {
  return props.columns?.map((item: any) => {
    return {
      ...item,
      ellipsis: {
        tooltip: true
      }
    }
  })
})

const tableRef = ref<DataTableInst>()

onMounted(() => emit('done', tableRef.value))
</script>
