<!--
   @description 音乐管理首页排行榜
   @author slh   
   @createDate 2024年08月07日 16:20:15
-->

<template>
  <div class="container flex jb gap-10">
    <ArrangeCard
      :loading="loading"
      :toggleButton="false"
      v-for="item in sortTags"
      :key="item.name"
      :title="item.name"
    >
      <span class="font-12 color-afafaf pl-16"
        >最近更新: {{ formatTime(item.trackNumberUpdateTime) }}（{{ item.updateFrequency }}）</span
      >
      <div class="list">
        <n-list hoverable>
          <n-list-item v-for="t in item.dataList" :key="t.id">
            <div class="flex">
              <n-image class="image" width="100" :src="t.al.picUrl" />
              <div class="names flex-col gap-10 items-center justify-center">
                <span>{{ t.name }}</span>
                <span class="ellipsis color-909090">{{ getArNames(t.ar) }}</span>
              </div>
              <ul class="example-2">
                <li class="icon-content">
                  <a href="javascript:;" data-social="red" @click="collectT(t)">
                    <div class="filled"></div>
                    <svg
                      t="1723097406384"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2566"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M270.336 965.632c-17.408 0-33.792-5.12-48.128-15.36-25.6-18.432-37.888-49.152-32.768-80.896l36.864-215.04c1.024-7.168-1.024-13.312-6.144-18.432L64.512 483.328c-22.528-22.528-30.72-54.272-20.48-84.992 10.24-29.696 34.816-51.2 66.56-56.32l216.064-31.744c7.168-1.024 12.288-5.12 15.36-11.264l96.256-195.584c14.336-28.672 41.984-46.08 73.728-46.08s60.416 17.408 73.728 46.08l96.256 195.584c3.072 6.144 9.216 10.24 15.36 11.264l216.064 31.744c31.744 4.096 56.32 25.6 66.56 56.32 10.24 29.696 2.048 62.464-20.48 84.992L803.84 635.904c-12.288 12.288-31.744 11.264-43.008-1.024s-11.264-31.744 1.024-43.008l156.672-152.576c8.192-8.192 6.144-17.408 5.12-21.504s-5.12-12.288-17.408-14.336l-216.064-31.744c-26.624-4.096-50.176-20.48-62.464-45.056l-96.256-195.584c-5.12-10.24-15.36-11.264-18.432-11.264s-13.312 1.024-18.432 11.264l-96.256 195.584c-12.288 24.576-34.816 40.96-62.464 45.056l-216.064 31.744c-11.264 2.048-15.36 10.24-17.408 14.336s-3.072 13.312 5.12 21.504l156.672 152.576c19.456 18.432 28.672 46.08 23.552 72.704l-36.864 215.04c-2.048 11.264 5.12 18.432 8.192 20.48s11.264 7.168 22.528 2.048l193.536-101.376c23.552-12.288 52.224-12.288 76.8 0l193.536 101.376c10.24 5.12 18.432 1.024 22.528-2.048 3.072-2.048 10.24-9.216 8.192-20.48L747.52 713.728c-3.072-16.384 8.192-32.768 25.6-35.84 16.384-3.072 32.768 8.192 35.84 24.576l28.672 165.888c5.12 30.72-7.168 62.464-32.768 80.896s-58.368 20.48-87.04 6.144L522.24 855.04c-6.144-3.072-13.312-3.072-19.456 0l-193.536 101.376c-12.288 6.144-25.6 9.216-38.912 9.216z"
                        p-id="2567"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </n-list-item>
        </n-list>
      </div>
    </ArrangeCard>
  </div>
</template>

<script lang="ts" setup>
import { topListSearch, topListSearchById } from '@/api/music'
import ArrangeCard from '../../MusicComponents/ArrangeCard/ArrangeCard.vue'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'MusicRanking'
})

const loading = ref(false)

const sort = ref(['飙升榜', '新歌榜', '原创榜', '热歌榜'])

const sortTags = ref<any>([])

const getTopList = async () => {
  loading.value = true
  const { code, data } = await topListSearch()
  loading.value = false
  if (code !== 200) return
  sortTags.value = data.filter((k: any) => sort.value.includes(k.name))
  if (sortTags.value.length > 0) getTopDetail()
}

const getTopDetail = () => {
  loading.value = true
  sortTags.value.forEach(async (k: any) => {
    const { code, data } = await topListSearchById(k.id)
    if (code !== 200) return
    k.dataList = data
  })
  loading.value = false
}

const collectT = (t: any) => {
  console.log('t ', t)
}

const getArNames = (ar: any) => {
  return ar.map((k: any) => k.name).join('、')
}

const formatTime = (time: number) => {
  const date = new Date(time)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month < 10 ? '0' + month : month}月-${day < 10 ? '0' + day : day}日`
}

onMounted(() => {
  getTopList()
})
</script>

<style lang="scss" scoped>
.container {
  :deep(.n-card__content) {
    padding-left: 0;
    padding-right: 0;
  }
  :deep(.n-list-item) {
    padding: 0;
  }
  .list {
    .image {
      width: 30%;
      border-radius: 10px;
      transform: scale(0.7);
    }
    .names {
      width: 50%;
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

ul {
  list-style: none;
}

.example-2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.example-2 .icon-content {
  cursor: pointer;
  margin: 0 10px;
  position: relative;
  transform: scale(0.8);
}
.example-2 .icon-content a {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #4d4d4d;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover {
  box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
}
.example-2 .icon-content a svg {
  position: relative;
  z-index: 1;
  width: 30px;
  height: 30px;
}
.example-2 .icon-content a:hover {
  color: white;
}
.example-2 .icon-content a .filled {
  position: absolute;
  top: auto;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #000;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover .filled {
  height: 100%;
}

.example-2 .icon-content a[data-social='linkedin'] .filled {
  background-color: #0274b3;
}

.example-2 .icon-content a[data-social='github'] .filled {
  background-color: #24262a;
}
.example-2 .icon-content a[data-social='instagram'] .filled {
  background: linear-gradient(45deg, #405de6, #5b51db, #b33ab4, #c135b4, #e1306c, #fd1f1f);
}
.example-2 .icon-content a[data-social='red'] .filled {
  background-color: #ff0000;
}
</style>
