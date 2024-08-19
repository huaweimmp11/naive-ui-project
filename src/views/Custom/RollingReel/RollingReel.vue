<!--
   @description css 动画 滚动卷轴
   @author slh
   @createDate 2024年08月19日 09:59:18
-->

<template>
  <CommonPage>
    <div class="container" ref="scrollContainer">
      <div class="reel">
        <div class="reel-bg" ref="reelBg"></div>
      </div>
      <article>
        <p v-for="item in 20" :key="item">
          他这辈子确实没有做过什么有意义的事情，除了扶老奶奶过马路，在公车上让座位，与街坊邻居和睦相处，帮助同学考试作弊⋯⋯，范慎是一个传统意义上的无用好男人。他的父母早就去世了，所以只留下他一个人孤单地呆在医院里，等待着自己生命终结的那一天到来。动手脚，身体似乎失去了控制。范慎很困难地撑着上眼皮，看着指头算自己这辈子做过些什么有意义的事情，结果右手五根瘦成筷子一样的指头还没有数完，他就叹了一口气，很伤心地放弃了这个工作。病房里的药水味总是这么刺鼻，旁边那床的老爷子前两天已经去地藏王菩萨那里报道了，大概再过几天就轮到自己吧。他得了某种怪病，重症肌无力，就是特别适合言情小说男主角的那种病。据说没得医，将来嗝屁的那天什么都动不了，只有眼泪可以流下来。痛！
        </p>
      </article>
    </div>
  </CommonPage>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import CommonPage from '@/components/CommonPage.vue'

defineOptions({
  name: 'RollingReel'
})

const scrollContainer = ref<HTMLElement>(null as unknown as HTMLElement)

const reelBg = ref<HTMLElement>(null as unknown as HTMLElement)

const handleScroll = () => {
  const scrollTop = scrollContainer.value.scrollTop
  const maxScroll = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
  const progress = scrollTop / maxScroll
  reelBg.value.style.transform = `translateY(-${progress * 100}%)`
}

watch(
  () => scrollContainer.value,
  (val) => {
    if (val) val.addEventListener('scroll', handleScroll)
  }
)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow-y: scroll;
  background-color: #22312d;
  font-family: '楷体', '楷体_GB2312', 'KaiTi', serif;
  &::before {
    content: '';
    display: block;
    height: 14px;
    background-color: #22312d;
    position: sticky;
    top: 10px;
  }
}
article {
  background-color: #f5ebd4;
  padding: 1em 0.5em;
  border-left: 10px solid #405c53;
  border-right: 10px solid #405c53;
  margin: 0 15px;
}
p {
  margin: 0;
  padding: 0.2em 0;
  color: #2c402e;
  line-height: 150%;
  text-indent: 2em;
}
h1 {
  text-align: center;
  color: #f5ebd4;
}
.reel {
  position: sticky;
  top: 0px;
  height: 28px;
  margin: 0 15px;
  border-radius: 1px;
  border-image: url('https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/c510959b.0txvec.png')
    fill 40 36/14px 12px/0 12px;
  box-shadow:
    0 5px 10px 5px rgba(0, 0, 0, 0.3),
    0 10px 20px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  &-bg {
    position: absolute;
    left: 0;
    width: 100%;
    height: 368px;
    background: url('https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/682ad393.to0id6.jpg')
      50% 0 / auto 50%;
    mix-blend-mode: multiply;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
