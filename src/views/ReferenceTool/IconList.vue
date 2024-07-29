<!--
   @description 引用工具 图标展示
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月27日 16:21:19
-->

<template>
  <CommonPage showFooter>
    <!-- <ul> -->
    <VueDraggable animation="450" target=".sort-target" v-model="iconsList">
      <TransitionGroup
        class="sort-target grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-16"
        type="transition"
        tag="ul"
        :name="!drag ? 'fade' : null"
      >
        <li
          v-for="item in iconsList"
          :key="item"
          class="w-160 f-c-c flex-col cursor-pointer rounded-12 px-12 py-24 card-border auto-bg"
          @click="copy(`&lt;i class=&quot;${item}&quot; /&gt;`)"
        >
          <i :class="`${item}?mask`" class="text-28 text-gray-600 hover:bg-primary" />
          <span
            class="mt-16 text-center text-14 text-gray-400 hover:color-primary"
            @click.stop="copy(item)"
          >
            {{ item }}
          </span>
        </li>
      </TransitionGroup>
    </VueDraggable>
    <!-- </ul> -->
  </CommonPage>
</template>

<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { useClipboard } from '@vueuse/core'
import { watch, ref } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import icons from 'isme:icons'

defineOptions({
  name: 'IconList'
})

const iconsList = ref(icons)

const drag = ref(false)

const { copy, copied } = useClipboard()

watch(copied, (val) => {
  val && window.$message.success('已复制到剪切板')
})
</script>

<style lang="scss" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
