<!--
   @description 编辑器 富文本 文章内容编辑
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年07月29日 14:03:02
-->

<template>
  <div ref="richTextEditor" :style="{ height: height + 'px' }"></div>
</template>

<script lang="ts" setup>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'RichTextEditor'
})

defineProps({
  height: {
    type: [Number, String],
    default: 200
  }
})

const emit = defineEmits(['initialized'])

const quill = ref(null as any)

const richTextEditor = ref(null as any)

const init = () => {
  const options = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // 切换按钮
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
        [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
        [{ direction: 'rtl' }], // 文本下划线
        [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
        [{ align: [] }],
        ['link', 'image'],
        ['clean'] // 清除格式
      ]
    },
    placeholder: '请输入文章内容…',
    theme: 'snow'
  }
  quill.value = new Quill(richTextEditor.value, options)
  emit('initialized', {
    getHtmlContent: () => richTextEditor.value.firstChild.innerHTML,
    getJsonContent: () => JSON.stringify(quill.value.getContents())
  })
}

onMounted(() => {
  init()
})
</script>
