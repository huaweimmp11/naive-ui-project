<!--
   @description 即时通讯 用户发送消息
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月12日 15:24:31
-->

<template>
  <n-card class="h-[100%]" :title="title">
    <template #footer v-if="props.sendUser">
      <div class="footer flex">
        <n-input
          class="w-[80%]"
          v-model:value="editvalue"
          :rows="3"
          :maxlength="150"
          autosize
          type="textarea"
          placeholder="发送内容"
        />
        <n-button>发送</n-button>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

defineOptions({
  name: 'ImUsersMessage'
})

const props = defineProps({
  sendUser: {
    type: Object as () => any,
    default: null
  }
})

const editvalue = ref<string>('')

const title = computed(() => {
  return props.sendUser?.name ? `${props.sendUser.name}` : ''
})
</script>
