<template>
  <main class="cus-scroll h-full flex-col flex-1 bg-#f5f6fb dark:bg-#121212">
    <transition name="fade-slide" mode="out-in" appear>
      <main :class="{ 'flex-1': full }" class="m-12">
        <slot />
      </main>
    </transition>
    <slot v-if="$slots.footer" name="footer" />
    <n-back-top :bottom="20" />
  </main>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'AppPage'
})

defineProps({
  full: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: false
  }
})
</script>
