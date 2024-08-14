<!--
   @description 即时通讯弹窗
   @author slh   
   @createDate 2024年08月12日 13:41:35
-->
<template>
  <UseModel ref="usemodel">
    <div class="im-box-dialog flex h-600">
      <div class="dialog-left w-[30%] h-full">
        <ImUsersList @click="checkSendUser" />
      </div>
      <div class="dialog-right w-[70%] h-full">
        <ImUsersMessage :sendUser="sendUser" />
      </div>
    </div>
  </UseModel>
</template>

<script lang="ts" setup>
import UseModel from '@/components/UseModel/UseModel.vue'
import ImUsersList from '../component/ImUsersList.vue'
import ImUsersMessage from '../component/ImUsersMessage.vue'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ImBoxDialog'
})

const usemodel = ref<any>(null)

const sendUser = ref<{ name?: string } | null>(null)

const show = () => {
  sendUser.value = null
  usemodel.value.show({
    title: '即时通讯',
    showFooter: false,
    closable: true
  })
}

const checkSendUser = (val: { name: string; password: string }) => {
  sendUser.value = val
}

onMounted(() => {})

defineExpose({
  show
})
</script>
