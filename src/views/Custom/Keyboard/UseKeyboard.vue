<!--
   @description 自定义键盘组件输入车牌
   @author slh
   @createDate 2024年08月14日 14:29:36
-->

<template>
  <CommonPage>
    <n-popover placement="top" :width="370" trigger="click" ref="popover" :show="show">
      <template #trigger>
        <n-input
          readonly
          v-model:value="plateNumber"
          style="width: 200px"
          placeholder="输入车牌号"
          @focus="show = true"
          @blur="show = false"
        >
        </n-input>
      </template>
      <Keyboard :modelValue="plateNumber" @updateModelValue="updateModelValue"></Keyboard>
    </n-popover>
  </CommonPage>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Keyboard from './Keyboard.vue'
import CommonPage from '@/components/CommonPage.vue'

defineOptions({
  name: 'UseKeyboard'
})

let plateNumber = ref<string>('')

const show = ref(false)

const popover = ref<any>(null)

const updateModelValue = (val: any) => {
  plateNumber.value = val
  show.value = false
}

watch(
  () => show.value,
  (val) => {
    if (val) plateNumber.value = ''
  }
)
</script>
