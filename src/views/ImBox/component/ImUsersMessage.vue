<!--
   @description 即时通讯 用户发送消息
   @author slh   
   @createDate 2024年08月12日 15:24:31
-->

<template>
  <n-card class="h-[100%]" :title="title">
    <div class="messages h-[96%]" v-if="props.sendUser">
      <div
        v-for="item in imList"
        :key="item.id"
        class="flex gap-4 items-center mt-20"
        :style="{
          'flex-direction': isTrueFrom(item) ? 'row-reverse' : 'row'
        }"
      >
        <span
          ><i
            class="i-fe:user"
            :style="{ 'background-color': isTrueFrom(item) ? 'green' : '#000' }"
          ></i
        ></span>
        <span
          class="pl-4 pr-4 content"
          :style="{
            'background-color': isTrueFrom(item) ? 'green' : '#e3e3e3',
            color: isTrueFrom(item) ? '#fff' : '#000'
          }"
          >{{ item.content }}</span
        >
        <span class="font-10 self-end">{{ item.time }}</span>
      </div>
    </div>
    <template #footer v-if="props.sendUser">
      <div class="footer mt-20 flex items-center">
        <i class="i-fe:phone-call mr-8"></i>
        <n-input
          class="w-[80%]"
          v-model:value="editvalue"
          :rows="3"
          :maxlength="150"
          autosize
          type="textarea"
          placeholder="发送内容"
          @keydown.enter="sendMessage"
        />
        <n-button @click="sendMessage">发送</n-button>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { io } from 'socket.io-client'
import { useUserStore } from '@/store/modules/user'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { getImList } from '@/api/retention'
import type { ImListData } from '@/utils/typeset'

defineOptions({
  name: 'ImUsersMessage'
})

const props = defineProps({
  sendUser: {
    type: Object as () => any,
    default: null
  }
})

const userStore = useUserStore()

const imList = ref<ImListData[]>([])

const socket = ref<any>(null)

const editvalue = ref<string>('')

const title = computed(() => {
  return props.sendUser?.name ? `${props.sendUser.name}` : ''
})

const isTrueFrom = (item: ImListData) => {
  return item.from === (userStore.userInfo as any).username
}

const sendMessage = () => {
  if (!editvalue.value) return window.$message.warning('请输入内容')
  socket.value.emit('message', {
    content: `${editvalue.value}`,
    from: (userStore.userInfo as any).username,
    to: title.value,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    id: uuidv4()
  })
  editvalue.value = ''
  getMessageList({
    from: (userStore.userInfo as any).username,
    to: props.sendUser.name
  })
}

const getMessageList = async (data?: { from: string; to: string }) => {
  const { code, data: resData } = await getImList(data)
  if (code !== 200) return
  imList.value = resData
}

watch(
  () => props.sendUser,
  (val) => {
    if (val && val.name)
      getMessageList({
        from: (userStore.userInfo as any).username,
        to: val.name
      })
  }
)

onMounted(() => {
  socket.value = io('http://localhost:1025/', {
    query: {
      userName: (userStore.userInfo as any).username
    }
  })
  getMessageList()
  socket.value.on('message', (data: ImListData) => {
    getMessageList({
      from: (userStore.userInfo as any).username,
      to: props.sendUser.name
    })
  })
})
</script>

<style lang="scss" scoped>
.messages {
  .content {
    padding: 2px 6px;
    border-radius: 10px;
  }
}

:deep(.n-card__content) {
  overflow: auto;
}
</style>
