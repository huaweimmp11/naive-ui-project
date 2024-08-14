<!--
   @description 车牌键盘组件
   @author slh
   @createDate 2024年08月14日 14:19:54
-->

<template>
  <div class="key-box">
    <div class="key-box-top">
      <KeyboardItem :value="keyValue" v-model:activeIndex="activeIndex"></KeyboardItem>
      <n-button type="primary" size="small" @click="finish">完成</n-button>
    </div>
    <div class="key-box-container">
      <div class="key-box-row" v-for="(item, index) in list" :key="index">
        <div
          class="key-box-row-wrapper"
          v-for="(val, index) in item"
          :key="index"
          :class="{
            'key-box-row-del-wrapper': val === 'del',
            'key-box-row-type-wrapper': val === 'type'
          }"
        >
          <n-button v-if="val === 'type'" class="key-box-row-btn-key" @click="handleChangeType">
            <span v-if="type === 'cn'">中/<span class="key-box-row-smaller">英</span></span>
            <span v-else><span class="key-box-row-smaller">中</span>/英</span>
          </n-button>
          <n-button
            v-else-if="val === 'delete'"
            class="key-box-row-btn-key"
            type="text"
            @click="handleDel"
            ><i class="i-fe:delete"></i
          ></n-button>
          <n-button
            v-else
            class="key-box-row-btn-key"
            :class="{ 'key-box-row-btn-empty': !val }"
            @click="handleClickKey(val)"
          >
            {{ val }}
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyboardItem from './KeyboardItem.vue'
import { ref, reactive, computed, watch } from 'vue'

defineOptions({
  name: 'Keyboard'
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['updateModelValue'])

let activeIndex = ref<number>(0)

let keyValue = ref<string>(props.modelValue)

let type = ref<string>('cn')

const cn = reactive<string[][]>([
  ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘'],
  ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋'],
  ['蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁'],
  ['type', '琼', '使', '领', '学', '警', '', '', 'delete']
])

const en = reactive<string[][]>([
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['type', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'delete']
])

const list = computed(() => (type.value == 'en' ? en : cn))

const handleChangeType = () => {
  type.value = type.value == 'cn' ? 'en' : 'cn'
}

watch(
  () => props.modelValue,
  (newValue: string) => {
    keyValue.value = newValue
  }
)

watch(
  () => activeIndex.value,
  (newValue: number) => {
    if (newValue == 0) {
      type.value = 'cn'
    } else {
      type.value = 'en'
    }
  }
)

const finish = () => {
  emit('updateModelValue', keyValue.value)
}

const handleDel = () => {
  if (activeIndex.value === 0 && !keyValue.value) return
  let currentValue = keyValue.value.split('')
  if (currentValue[activeIndex.value]) {
    currentValue.splice(activeIndex.value, 1)
  }
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
  keyValue.value = currentValue.join('')
}

const handleClickKey = (val: string) => {
  const currentValue = keyValue.value.split('')
  currentValue[activeIndex.value] = val
  keyValue.value = currentValue.join('')
  if (activeIndex.value < 7) {
    activeIndex.value++
  }
}
</script>

<style scoped lang="scss">
.key-box {
  width: 100%;
  .key-box-top {
    display: flex;
    align-items: center;
    .key-box-top {
      border-bottom: 1px solid #ccc;
    }
  }
  .key-box-container {
    padding: 3px;
    padding-bottom: 22px;
    .key-box-row {
      display: flex;
      justify-content: center;
    }
    .key-box-row-wrapper {
      flex: 0 1 calc((100% - 6px * 10) / 10);
      padding: 3px;
      box-sizing: content-box;
      margin: 1px;
      border: 1px solid #999;
      display: flex;
      align-items: center;
      text-align: center;
      cursor: pointer;
      &.key-box-row-del-wrapper,
      &.key-box-row-type-wrapper {
        flex: 1;
      }
      &.key-box-row-type-wrapper {
        .key-box-row-smaller {
          color: #999;
          font-size: 12px;
        }
      }
      .key-box-row-btn-key {
        padding: 0;
        width: 100%;
        border-radius: 4px;
      }
      .key-box-row-btn-empty {
        background: transparent;
        border: none;
      }
      .key-box-row-delete-icon {
        width: 18px;
        vertical-align: middle;
      }
    }
  }
}
</style>
