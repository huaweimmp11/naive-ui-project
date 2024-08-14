<!--
   @description Music
   @author slh   
   @createDate 2024年07月31日 15:41:16
-->

<template>
  <div id="aplayer"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'

interface Audio {
  name: string
  artist: string
  url: string
  cover?: string
  lrc?: string
  theme?: string
}

defineOptions({
  name: 'Music'
})

const props = defineProps({
  /** 吸底模式 */
  fixed: {
    type: Boolean,
    default: true
  },
  /**
   * 迷你模式
   * 如果开启吸底模式，该选项可以控制播放器展开或收起
   */
  mini: {
    type: Boolean,
    default: true
  },
  /** 主题色 */
  theme: {
    type: String,
    default: '#b7daff'
  },
  /** 音量 */
  volume: {
    type: Number,
    default: 0.7
  },
  /** 自动播放 */
  autoplay: {
    type: Boolean,
    default: false
  },
  /** 列表默认折叠 */
  listFolded: {
    type: Boolean,
    default: true
  },
  /** 列表最大高度 */
  listMaxHeight: {
    type: Number,
    default: 100
  }
})

const appStore = useAppStore()

const randomColor = () => {
  return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
}

const audio = ref<Audio[]>([
  // {
  //   name: 'China-Y',
  //   artist: '徐梦圆',
  //   url: 'https://music.163.com/song/media/outer/url?id=1330348068.mp3',
  //   cover: 'http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg',
  //   lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing', // 歌词
  //   theme: randomColor()
  // },
  // {
  //   name: 'China-Y',
  //   artist: '徐梦圆',
  //   url: 'https://music.163.com/song/media/outer/url?id=1330348068.mp3',
  //   cover: 'http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg',
  //   lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing', // 歌词
  //   theme: randomColor()
  // }
])

const addMyAudio = () => {
  /**
   * api 方法
   * https://aplayer.js.org/#/zh-Hans/?id=api
   */
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: audio.value,
    fixed: props.fixed,
    mini: props.mini,
    lrcType: 3,
    theme: props.theme,
    volume: props.volume,
    autoplay: props.autoplay,
    listFolded: props.listFolded,
    listMaxHeight: props.listMaxHeight
  })
  appStore.setMusicAp(ap)
}

onMounted(() => addMyAudio())
</script>
