<!--
   @description 车牌键盘组件 输入框部分
   @author slh
   @createDate 2024年08月14日 14:16:31
-->

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
import { reactive, watch } from 'vue'

defineOptions({
  name: 'KeyboardItem'
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
</script>

<style lang="scss" scoped>
.input-box {
  flex: 1;
  display: flex;
  list-style: none;
  padding-left: 0;
  > li {
    list-style-type: none;
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
