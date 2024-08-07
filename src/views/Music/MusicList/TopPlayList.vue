<!--
   @description 音乐管理首页 热门推荐列表
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月06日 16:48:11
-->

<template>
  <div class="container" flex je gap-30 :loading="true">
    <div class="cards" v-for="item in data" :key="item.id">
      <figure class="card">
        <n-image :src="item.coverImgUrl" preview-disabled width="240" class="image"> </n-image>
        <span class="ab-count pl-4 pr-4 font-12"
          ><i class="i-fe:radio font-16 mr-4"></i>{{ formartNum(item.playCount) }}/{{
            item.trackCount
          }}首</span
        >
        <figcaption class="card_title font-12">
          {{ item.name }}
        </figcaption>
      </figure>
      <div v-if="item.tags?.length" class="tags font-12">
        <span class="item" v-for="k in item.tags"> #{{ k }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MusicListTopPlayList } from '@/utils/musicTypes'
import type { PropType } from 'vue'
import { formartNum } from '@/utils/func'

defineOptions({
  name: 'TopPlayList'
})

const props = defineProps({
  data: {
    type: Array as PropType<MusicListTopPlayList[]>,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 86%;
  .n-image {
    width: 100%;
  }
}

.cards {
  flex: 1;
  perspective: 500px;
}

.card {
  height: 100%;
  border-radius: 4px;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.5s;
  &:hover {
    transform: translateZ(10px) rotateX(20deg) rotateY(20deg);
  }
  .image {
    position: relative;
    border-radius: 4%;
    transform: scale(0.8);
  }
  .ab-count {
    display: flex;
    position: absolute;
    height: 20px;
    top: 20px;
    right: 25%;
    transform: translateX(50%);
    color: #fff;
    border-radius: 10%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 97%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
}

.card_title {
  color: #fff;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(50%);
  transition: transform 0.5s;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

.card:hover .card_title {
  transform: translateZ(50px);
}

.tags {
  cursor: pointer;
  .item {
    color: #ff641e;
  }
}
</style>
