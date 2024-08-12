<!--
   @description 即时通讯 用户列表
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月12日 14:32:29
-->
<template>
  <n-input v-model:value="userSearchText" type="text" placeholder="搜索用户" />
  <n-list hoverable clickable bordered>
    <n-list-item v-for="item in datalist" :key="item.name" @click="handleClick(item)">
      <template #prefix> <i class="i-fe:user"></i> </template>
      <n-thing>{{ item.name }}</n-thing>
    </n-list-item>
  </n-list>
</template>

<script lang="ts" setup>
import { getSysUsers } from '@/api/retention'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'

defineOptions({
  name: 'ImUsersList'
})

const emit = defineEmits(['click'])

const userStore = useUserStore()

const datalist = ref<{ name?: string; password?: string }[]>([])

const oringinDataList = ref<{ name?: string; password?: string }[]>([])

const userSearchText = ref<string>('')

const getUsers = async () => {
  const { data } = await getSysUsers()
  if (data) datalist.value = data
  if ((userStore.userInfo as any).username) {
    datalist.value = datalist.value.filter(
      (item) => item.name !== (userStore.userInfo as any).username
    )
    oringinDataList.value = datalist.value
  }
}

const handleClick = (item: { name?: string; password?: string }) => {
  emit('click', item)
}

watch(
  () => userSearchText.value,
  (val) => {
    if (val) {
      datalist.value = oringinDataList.value
      datalist.value = datalist.value.filter((user) => {
        return user.name?.indexOf(val) !== -1
      })
    } else {
      datalist.value = oringinDataList.value
    }
  }
)

onMounted(() => {
  userSearchText.value = ''
  getUsers()
})
</script>
