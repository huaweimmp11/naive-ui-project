<!-- 
   @description 登录后跳转首页
   @author s120
   @createDate 2023年12月15日 15:19:19
 -->

<template>
  <AppPage show-footer>
    <div class="flex">
      <MessageCard class="min-w-200 w-30%" title="Welcome" :loading="cardLoading">
        <template #header-extra>
          <n-button
            class="text-14 text-primary text-highlight hover:opacity-80"
            size="tiny"
            quaternary
          >
            <i class="i-fe:refresh-ccw cursor-pointer" @click="refreshMotto" />
          </n-button>
        </template>
        <p class="mt-28 text-14 opacity-60">{{ motto.content }}</p>
        <p class="mt-12 text-right text-12 opacity-40">—— {{ motto.auth }}</p>
        <template #card-action>
          <p class="text-12 opacity-60 text-center">{{ currentDate }}</p>
        </template>
      </MessageCard>
      <MessageCard class="ml-12 w-70%" title="✨ 欢迎使用 Vue Naive Admin 2.0">
        <template #header-extra>
          <a
            class="text-14 text-primary text-highlight hover:underline hover:opacity-80"
            href="javascript:;"
          >
            isme
          </a>
        </template>
        <div class="mt-12 flex items-end justify-between">
          <QrCode />
          <n-button
            type="primary"
            class="ml-12"
            tag="a"
            href="https://gitee.com/s02s02/naive-ui-project"
            target="__blank"
          >
            代码仓库
          </n-button>
        </div>
      </MessageCard>
    </div>
    <div class="flex mt-12">
      <MessageCard class="min-w-200 w-50%" :height="260" title="Welcome" :loading="cardLoading">
        <template #header-extra>
          <n-button
            class="text-14 text-primary text-highlight hover:opacity-80"
            size="tiny"
            quaternary
          >
            <i class="i-fe:refresh-ccw cursor-pointer" @click="refreshMotto" />
          </n-button>
        </template>
        <p class="mt-28 text-14 opacity-60">{{ motto.content }}</p>
        <p class="mt-12 text-right text-12 opacity-40">—— {{ motto.auth }}</p>
        <template #card-action>
          <p class="text-12 opacity-60 text-center">{{ currentDate }}</p>
        </template>
      </MessageCard>
      <MessageCard class="ml-12 w-50%" title="🛠️ 技术栈" :height="460" segmented>
        <VChart :option="skillOption" autoresize />
      </MessageCard>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { getHomeMottoMsg } from '@/api/retention'
import AppPage from '@/components/AppPage.vue'
import dayjs from 'dayjs'
import * as echarts from 'echarts/core'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import MessageCard from '@/components/MessageCard.vue'
import { onMounted, ref } from 'vue'
import QrCode from '@/components/QrCode.vue'

defineOptions({
  name: 'HomeView'
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

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart
])

const motto = ref({
  content: '',
  auth: ''
})

const currentDate = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const timer = ref(null as any)

const cardLoading = ref(false)

const skillOption = ref({
  tooltip: {
    trigger: 'item',
    formatter({ name, value }: { name: string; value: number }) {
      return `${name} ${value}%`
    }
  },
  legend: {
    left: 'center'
  },
  series: [
    {
      top: '12%',
      type: 'pie',
      radius: ['35%', '90%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 38.5, name: 'Vue' },
        { value: 37.0, name: 'JavaScript' },
        { value: 6.5, name: 'CSS' },
        { value: 6.2, name: 'HTML' },
        { value: 1.8, name: 'Other' }
      ]
    }
  ]
})

async function refreshMotto() {
  cardLoading.value = true
  const { code, data } = await getHomeMottoMsg()
  cardLoading.value = false
  if (code !== 200) return
  const index = Math.floor(Math.random() * data.length)
  motto.value = {
    content: data[index].content,
    auth: data[index].auth
  }
}

onMounted(() => {
  if (timer.value) clearInterval(timer.value)
  refreshMotto()
  timer.value = setInterval(() => {
    currentDate.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
</script>

<style lang="scss" scoped></style>
