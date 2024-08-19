<!--
   @description 音乐管理 管理首页
   @author slh   
   @createDate 2024年08月01日 09:42:22
-->

<template>
  <CommonPage>
    <template #action> <n-button @click="handleLoginMusic">登录音乐账号</n-button></template>
    <ArrangeCard
      v-for="item in arrageProps"
      :key="item.title"
      :title="item.title"
      :loading="loading"
      :tag="item.tag"
      :height="item.title === '热门推荐' ? 300 : 420"
      @tag-click="handleTagClick"
    >
      <template v-if="item.title === '热门推荐'">
        <TopPlayList :data="topPlayList" />
      </template>
      <template v-else-if="item.title === '新碟上架'">
        <NewDiscList :data="newDiscList" />
      </template>
    </ArrangeCard>
    <MusicRanking></MusicRanking>
    <UseModel ref="useModel"></UseModel>
  </CommonPage>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import ArrangeCard from '../../MusicComponents/ArrangeCard/ArrangeCard.vue'
import UseModel from '@/components/UseModel/UseModel.vue'
import MusicRanking from '../MusicRanking/MusicRanking.vue'
import { getLoginQrcodeKey, topAlbumSearch, topPlayListSearch } from '@/api/music'
import {
  AlbumArea,
  AlbumType,
  type MusicListNewDiscList,
  type MusicListTopPlayList
} from '@/utils/musicTypes'
import NewDiscList from '../NewDiscList.vue'
import TopPlayList from '../TopPlayList.vue'
import dayjs from 'dayjs'

defineOptions({
  name: 'MusicListMain'
})

const arrageProps = ref([
  {
    title: '热门推荐',
    tag: ['为您推荐', '华语', '流行', '摇滚', '民谣', '电子']
  },
  {
    title: '新碟上架',
    tag: ['全部', '华语', '欧美', '韩国', '日本']
  }
])

const loading = ref(false)

const useModel = ref<InstanceType<typeof UseModel>>()

const newDiscList = ref<MusicListNewDiscList[]>([])

const topPlayList = ref<MusicListTopPlayList[]>([])

const areaType = ref(AlbumArea.ALL)

const topType = ref<string>('全部')

const loginQrKey = ref<string>('')

const getTopAlbum = async () => {
  loading.value = true
  const { data } = await topAlbumSearch({
    type: AlbumType.new,
    area: areaType.value,
    limit: 12,
    year: dayjs().year(),
    month: dayjs().month() + 1
  })
  newDiscList.value = data.slice(0, 12)
  loading.value = false
}

const getTopPlayList = async () => {
  loading.value = true
  const { data } = await topPlayListSearch({
    cat: topType.value,
    order: 'hot',
    limit: 6,
    offset: 0
  })
  topPlayList.value = data
  loading.value = false
}

const handleLoginMusic = async () => {
  useModel.value?.show({
    title: '登录网易云音乐账号',
    showFooter: false,
    closable: true
  })
  const { data } = await getLoginQrcodeKey()
  loginQrKey.value = data
}

const handleTagClick = ({ title, tag }: { title: string; tag: string }) => {
  if (title === '新碟上架') {
    switch (tag) {
      case '全部':
        areaType.value = AlbumArea.ALL
        break
      case '华语':
        areaType.value = AlbumArea.ZH
        break
      case '欧美':
        areaType.value = AlbumArea.EA
        break
      case '韩国':
        areaType.value = AlbumArea.KR
        break
      case '日本':
        areaType.value = AlbumArea.JP
        break
      default:
        break
    }
    getTopAlbum()
  } else if (title === '热门推荐') {
    topType.value = tag
    getTopPlayList()
  }
}

onMounted(() => {
  getTopAlbum()
  getTopPlayList()
})
</script>
