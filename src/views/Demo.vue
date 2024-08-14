<template>
  <ul class="input-box">
    <li
      v-for="(item, index) in plateNumber"
      :key="index"
      :class="{ active: props.activeIndex === index }"
      @click="handleClickItem(index)"
    >
      <span>{{ item }}</span>
      <span v-if="props.activeIndex === index" class="active_border"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue'

defineOptions({
  name: 'Demo'
})

interface Props {
  value: string
  activeIndex: number
}

const emit = defineEmits<{
  (event: 'update:activeIndex', value: number): void
}>()

const props = defineProps<Props>()

let plateNumber = reactive<string[]>(Array(8).fill(''))

const handleClickItem = (index: number) => {
  emit('update:activeIndex', index)
}

watch(
  () => props.value,
  (newValue) => {
    const currentValue = newValue.split('')
    plateNumber = currentValue.concat(Array(plateNumber.length - currentValue.length).fill(''))
  }
)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.input-box {
  flex: 1;
  display: flex;
  list-style: none; /* 去掉 ul 的默认点样式 */
  padding-left: 0; /* 去掉 ul 的默认内边距 */
  > li {
    list-style-type: none; /* 去掉 li 的默认点样式 */
    flex: 1;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ccc;
    margin: 5px;
    cursor: pointer;
    text-align: center;
  }
  > li.active {
    position: relative;
    .active_border {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: red;
    }
  }
}
</style>
