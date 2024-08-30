<!--
   @description 菜单搜索图标
   @author slh
   @createDate 2024年08月22日 09:40:16
-->

<template>
  <i class="i-fe:search mr-16 cursor-pointer" @click="toggle"></i>
  <SearchMenuModal ref="modal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SearchMenuModal from './SearchMenuModal.vue'

defineOptions({
  name: 'SearchMenuIcon'
})

const modal = ref<any>(null)

const toggle = () => {
  modal.value.show()
}
</script>
