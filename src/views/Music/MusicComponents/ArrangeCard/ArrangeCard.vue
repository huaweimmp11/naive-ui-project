<!--
   @description 音乐首页 排列容器
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月06日 10:07:18
-->

<template>
  <MessageCard :height="props.height" :loading="props.loading" :title="props.title" class="mb-10">
    <template #header-extra v-if="props.toggleButton">
      <div class="flex gap-8">
        <n-button
          quaternary
          v-for="(item, index) in props.tag"
          :key="index"
          @click="tagOnClick(item as string)"
          >{{ item }}</n-button
        >
      </div>
    </template>
    <slot />
  </MessageCard>
</template>

<script lang="ts" setup>
import MessageCard from '@/components/MessageCard.vue'
defineOptions({
  name: 'ArrangeCard'
})

const emit = defineEmits(['tag-click'])

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  tag: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: [Number, String],
    default: 'auto'
  },
  toggleButton: {
    type: Boolean,
    default: true
  }
})

const tagOnClick = (tag: string) => {
  emit('tag-click', { title: props.title, tag })
}
</script>

<style lang="scss" scoped>
:deep(.n-card__content) {
  height: 76%;
  padding-bottom: 0;
  overflow: hidden;
}
</style>
