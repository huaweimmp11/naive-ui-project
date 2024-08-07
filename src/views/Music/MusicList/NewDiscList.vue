<!--
   @description 音乐管理首页 新碟上架列表
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月06日 14:20:24
-->

<template>
  <div class="container flex flex-wrap gap-6 je" :style="cssVars">
    <div class="container-item flex jb" v-for="item in data" :key="item.id">
      <div class="card">
        <div class="card1 flex je">
          <n-image width="100" :src="item.picUrl" preview-disabled />
          <div class="container-item-right flex-col je font-14">
            <CardTooltip class="text-center font-16" :text="item.name || ''" />
            <CardTooltip class="text-center font-12" :text="item.artist?.name || ''" />
          </div>
          <div class="go-corner" :style="primaryStyle">
            <div class="go-arrow font-12">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import CardTooltip from '@/components/CardTooltip.vue'
import { useAppStore } from '@/store/modules/app'
import type { MusicListNewDiscList } from '@/utils/musicTypes'

defineOptions({
  name: 'NewDiscList'
})

const props = defineProps({
  data: {
    type: Array as PropType<MusicListNewDiscList[]>,
    default: () => []
  }
})

const primaryStyle = computed(() => {
  return { 'background-color': useAppStore().primaryColor }
})

const cssVars = computed(() => {
  return {
    '--background-color': useAppStore().primaryColor,
    '--card-background-color': useAppStore().isDark ? '#303030' : '#fff'
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  &-item {
    width: 24%;
    height: 100px;
    border-radius: 10px;
    padding: 2px 3px;
    &-right {
      width: 44%;
    }
  }
}

.card {
  width: 100%;
  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #666;
  }
}

.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 52px;
  height: 34px;
  overflow: hidden;
  top: 0;
  right: 0;
  border-radius: 0 4px 0 32px;
  .go-arrow {
    transform: rotate(18deg);
    color: #fff;
    margin-top: -4px;
    margin-right: -4px;
    font-family: courier, sans;
  }
}

.card1 {
  height: 100%;
  position: relative;
  background-color: var(--card-background-color);
  border-radius: 10px;
  margin: 2px;
  z-index: 0;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: var(--background-color);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }
  &:hover::before {
    transform: scale(21);
    .container-item-right {
      color: white;
    }
  }
}

.card1:hover p {
  transition: all 0.3s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.card1:hover h3 {
  transition: all 0.3s ease-out;
  color: #fff;
}

.card2 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}

.card2:hover {
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #ccc;
  background-color: white;
}

.card2:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: var(--background-color);
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}

.card2:hover:before {
  transform: scale(2.15);
}

.card3 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}

.card3 .go-corner {
  opacity: 0.7;
}

.card3:hover {
  border: 1px solid var(--background-color);
  box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
  z-index: 500;
}

.card3:hover .go-corner {
  transition: opactiy 0.3s linear;
  opacity: 1;
}

.card4 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #fff;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid #ccc;
}

.card4 .go-corner {
  background-color: var(--background-color);
  height: 100%;
  width: 16px;
  padding-right: 9px;
  border-radius: 0;
  transform: skew(6deg);
  margin-right: -36px;
  align-items: start;
  background-image: linear-gradient(-45deg, #8f479a 1%, #dc2a74 100%);
}

.card4 .go-arrow {
  transform: skew(-6deg);
  margin-left: -2px;
  margin-top: 9px;
  opacity: 0;
}

.card4:hover {
  border: 1px solid #cd3d73;
}

.card4 h3 {
  margin-top: 8px;
}

.card4:hover .go-corner {
  margin-right: -12px;
}

.card4:hover .go-arrow {
  opacity: 1;
}
</style>
