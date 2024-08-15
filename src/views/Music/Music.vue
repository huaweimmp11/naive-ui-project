<!--
   @description Music Meting
   @author slh   
   @createDate 2024年07月31日 15:41:16
-->

<template>
  <meting-js
    server="netease"
    type="playlist"
    id="2392080276"
    :fixed="true"
    :mini="true"
    :autoplay="false"
  >
  </meting-js>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Music'
})
</script>
