<!--
   @description 引用工具 图片上传
   @author slh   
   @createDate 2024年07月27日 16:21:19
-->

<template>
  <CommonPage>
    <n-upload
      class="mx-auto w-[75%] p-20 text-center"
      :custom-request="handleUpload"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
      @before-upload="onBeforeUpload"
    >
      <n-upload-dragger>
        <div class="h-150 f-c-c flex-col">
          <i class="i-mdi:upload mb-12 text-68 color-primary" />
          <n-text class="text-14 color-gray"> 点击或者拖动文件到该区域来上传 </n-text>
        </div>
      </n-upload-dragger>
    </n-upload>
    <n-card class="mt-16 items-center">
      <n-image-group>
        <n-space justify="space-between" align="center">
          <n-card v-for="(item, index) in imgList" :key="index" class="w-280 hover:card-shadow">
            <div class="h-160 f-c-c">
              <n-image width="200" :src="item.url" />
            </div>
            <n-space class="mt-16" justify="space-evenly" style="gap: none">
              <n-button dashed type="primary" @click="copy(item.url as string)"> url </n-button>
              <n-button dashed type="primary" @click="copy(`![${item.fileName}](${item.url})`)">
                MD
              </n-button>
              <n-button
                dashed
                type="primary"
                @click="copy(`&lt;img src=&quot;${item.url}&quot; /&gt;`)"
              >
                img
              </n-button>
              <n-button dashed type="primary" @click="printImage(item.url as string)">
                打印
              </n-button>
            </n-space>
          </n-card>
          <div v-for="i in 4" :key="i" class="w-280" />
        </n-space>
      </n-image-group>
    </n-card>
  </CommonPage>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { UploadCustomRequestOptions, UploadSettledFileInfo } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import { getImageUploadList, uploadImageByBase64 } from '@/api/retention'
import printJS from 'print-js'

defineOptions({
  name: 'ImageUpload'
})

let imgList = ref<{ url?: string; fileName?: string }[]>([])

const { copy, copied } = useClipboard()

watch(copied, (val) => {
  val && window.$message.success('已复制到剪切板')
})

const handleUpload = async (options: UploadCustomRequestOptions) => {
  const { file, onFinish } = options
  if (!file || !file.type) {
    window.$message.error('请选择文件')
  }
  if (!file.file || !file.file.size) {
    window.$message.error('无法获取文件的大小')
    return
  }
  // 文件大小校验，单位为字节
  // const fileSizeInKB = file.file.size / 1024 // 将字节转换为KB
  //   if (fileSizeInKB < 20 || fileSizeInKB > 200) {
  //     window.$message.error('文件大小必须在 20KB 到 200KB 之间')
  //     onFinish()
  //     return
  //   }
  // 上传文件
  const base64File = await readFileAsBase64(file.file as unknown as File)
  const { name: fileName, id } = file
  const { code } = await uploadImageByBase64({
    id,
    fileName,
    url: base64File
  })
  if (code !== 200) {
    window.$message.error('上传失败')
  } else {
    window.$message.success('上传成功')
  }
  onFinish()
  fetchImgList()
}

const fetchImgList = async () => {
  const { code, data } = await getImageUploadList()
  if (code !== 200) return
  imgList.value = data
}

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const onBeforeUpload = ({ file }: { file: UploadSettledFileInfo }) => {
  if (!file.file?.type.startsWith('image/')) {
    window.$message.error('只能上传图片')
    return false
  }
  return true
}

const printImage = (url: string) => {
  printJS({
    printable: url,
    type: 'image',
    style: 'img { width: 100%; }'
  })
}

onMounted(async () => {
  await fetchImgList()
})
</script>
