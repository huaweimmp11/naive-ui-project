<!--
   @description 菜单搜索弹窗
   @author slh
   @createDate 2024年08月22日 09:40:16
-->

<template>
  <UseModel ref="modal" style="position: relative">
    <n-input placeholder="菜单搜索" v-model:value="searchText" type="text">
      <template #prefix>
        <i class="i-me:awesome"></i>
      </template>
    </n-input>
    <div
      class="w-[90%] h-[66%] flex items-center"
      style="position: absolute; justify-content: flex-end"
    >
      <div class="img-bg w-[30%] h-full" style="position: absolute"></div>
      <img class="w-[20%] h-[60%]" src="@/assets/images/pinyin-pro.svg" alt="" />
    </div>
    <div
      v-if="searchList.length <= 0"
      class="nodata w-full h-200 color-969faf flex justify-center items-center text-center"
    >
      <span>暂无搜索内容</span>
    </div>
    <div v-else class="search-list w-full h-full">
      <n-list hoverable clickable :show-divider="false">
        <n-list-item v-for="route in searchList" :key="route.name">
          <template #prefix>
            <i :class="`i-fe:${route.meta.icon}`" style="display: block"></i>
          </template>
          <n-thing class="flex" @click="routerPush(route)">
            {{ route.meta.title }}
          </n-thing>
        </n-list-item>
      </n-list>
    </div>
  </UseModel>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { match } from 'pinyin-pro'
import { debounce } from 'lodash-es'
import UseModel from '@/components/UseModel/UseModel.vue'
import { asyncRoutes } from '@/router/routes'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'SearchMenuModal'
})

const modal = ref<any>(null)

const router = useRouter()

const searchText = ref<string>('')

const searchList = ref<any[]>([])

const show = () => {
  modal.value.show({
    title: '菜单搜索',
    showFooter: false,
    closable: true,
    segmented: {},
    top: 60
  })
  searchText.value = ''
  searchList.value = []
}

const filterRoutes = (routes: any) => {
  routes.forEach((route: any) => {
    if (route.meta && route.meta.title) {
      const title = route.meta.title
      const matched: any = match(title, searchText.value, { continuous: true })
      if (matched && matched.length > 0) {
        searchList.value.push(route)
      }
    }
    if (route.children) {
      const children: any = filterRoutes(route.children)
      if (children && children.length > 0) {
        searchList.value.push({ ...route, children })
      }
    }
  })
}

const routerPush = (route: any) => {
  modal.value.hide()
  router.push({
    name: route.name
  })
}

watch(
  () => searchText.value,
  debounce((val: string) => {
    if (val) {
      searchList.value = []
      filterRoutes(asyncRoutes)
    } else {
      searchList.value = []
    }
  }, 600)
)

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.img-bg {
  border-radius: 50%;
  filter: blur(50px);
  background-image: linear-gradient(-45deg, rgba(250, 78, 62, 0.5) 50%, rgba(0, 106, 255, 0.3) 50%);
}

.search-list {
  padding: 8px 10px;
}

:deep(.n-list.n-list--hoverable .n-list-item:hover) {
  color: #fff;
  background: linear-gradient(to right, #2e84db, rgba(255, 0, 0, 0));
  background-position: left center; // 初始位置在左边
  transition: background-position 0.3s; // 添加过渡效果
  .flex {
    color: #fff;
  }
}
</style>
