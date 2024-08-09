<!--
   @description 实时天气
   @author slh
   @copyright NanJing Anshare Tech .Com
   @createDate 2024年08月09日 10:51:33
-->

<template>
  <CommonPage showFooter>
    <!-- 实时天气 -->
    <MessageCard title="">
      <n-descriptions label-placement="left" bordered :column="3">
        <template #header>
          <div class="flex gap-6 align-center" v-if="!state.showEdit">
            <span>{{ state.querySearchCity }}</span>
            <i class="i-fe:edit" @click="openCityEdit"></i>
          </div>
          <div v-else class="flex">
            <n-auto-complete
              style="width: 30%"
              v-model:value="state.querySearchCity"
              :input-props="{
                autocomplete: 'disabled'
              }"
              :options="cityOptions"
              :on-select="handleCitySelect"
              :clearable="false"
            />
            <n-button @click="closeCityEdit">确定</n-button>
          </div>
        </template>
        <n-descriptions-item v-for="item in realTimeDescriptionsItems" :key="item.label">
          <template #label>
            <div class="flex gap-6 align-center">
              <i :class="`i-fe:${item.icon}`" />
              {{ item.label }}
            </div>
          </template>
          {{ judgNowValue(item.value) }}
        </n-descriptions-item>
        <n-descriptions-item>
          <template #label>
            <div class="flex gap-6 align-center">
              <i class="i-fe:link" />
              数据来源
            </div>
          </template>
          <a href="https://www.qweather.com/" target="_blank">和风天气</a>
        </n-descriptions-item>
      </n-descriptions>
    </MessageCard>
    <!-- 24小时天气预报 -->
    <MessageCard :height="440" title="24小时天气预报" class="mt-6">
      <VChart :option="state.hourInfo" autoresize />
    </MessageCard>
    <!-- 未来7天天气 -->
    <MessageCard :height="400" title="未来7天天气" class="mt-6">
      <VChart :option="state.dayInfo" autoresize />
    </MessageCard>
    <MessageCard title="未来7天天气表格数据" class="mt-6">
      <DataTable
        :data="state.weatherInfo.daily"
        class="mt-10"
        :columns="columns"
        :showPagination="false"
      />
    </MessageCard>
  </CommonPage>
</template>

<script lang="ts" setup>
import { h, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import CommonPage from '@/components/CommonPage.vue'
import MessageCard from '@/components/MessageCard.vue'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent
} from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import axios from 'axios'
import DataTable from '@/components/DataTable.vue'
import { NGradientText } from 'naive-ui'

defineOptions({
  name: 'RealTimeWeather'
})

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  ToolboxComponent,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  TitleComponent
])

const state = reactive({
  weatherInfo: {} as any,
  nowInfo: {} as any,
  hourInfo: {},
  dayInfo: {},
  key: 'da223d54efe84511ac1ed64033a6b875',
  /** 南京地理坐标 */
  location: '118.80,32.06',
  city: '玄武区',
  querySearchCity: '玄武区',
  showEdit: false
})

const realTimeDescriptionsItems = ref([
  { label: '天气', value: 'text', icon: 'sun' },
  { label: '温度', value: 'temp', icon: 'hightemp' },
  { label: '风向', value: 'windDir', icon: 'wind' },
  { label: '风速', value: 'windSpeed', icon: 'wind-speed' },
  { label: '湿度', value: 'humidity', icon: 'humidness' },
  { label: '更新时间', value: 'obsTime', icon: 'time' }
])

const hourInfoTemplate = ref({
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        //轴线不显示
        show: false
      },
      position: 'bottom', //x轴线位置
      offset: -30 //轴线偏移量，当position:'bottom'，正值向下移，负值向上移
    }
  ],
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '温度',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: '{c} °C'
      }
    }
  ]
})

const dayInfoTemplate = ref({
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '最高温',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: '{c} °C'
      }
    },
    {
      name: '最低温',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [
          {
            name: '周最低',
            value: -2,
            xAxis: 1,
            yAxis: -1.5
          }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max'
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: '{c} °C'
      }
    }
  ]
})

const cityOptions = ref<any>([])

const judgNowValue = (value: string) => {
  if (state.nowInfo[value]) {
    switch (value) {
      case 'temp':
        return state.nowInfo[value] + '°C'
      case 'humidity':
        return state.nowInfo[value] + '%'
      case 'windSpeed':
        return state.nowInfo[value] + '级'
      case 'obsTime':
        return state.nowInfo[value].slice(0, 16).replace('T', ' ')
      default:
        return state.nowInfo[value]
    }
  }
}

const getNowInfo = async () => {
  await axios({
    url: `https://devapi.qweather.com/v7/weather/now?key=${state.key}&location=${state.location}`,
    method: 'get'
  }).then((res) => {
    state.nowInfo = res.data.now
  })
}

const get24Data = async () => {
  await axios({
    url: `https://devapi.qweather.com/v7/weather/24h?key=${state.key}&location=${state.location}`,
    method: 'get'
  }).then(({ data }) => {
    let hourly: any = data.hourly
    let hourInfo: any = hourInfoTemplate.value
    hourInfo.xAxis[0].data = []
    hourInfo.series[0].data = []
    for (let i = 0; i < hourly.length; i++) {
      let hour = hourly[i]
      hourInfo.xAxis[0].data[i] = hour.fxTime.slice(11, 16)
      hourInfo.series[0].data[i] = hour.temp
    }
    state.hourInfo = hourInfo
  })
}

const get7d = async () => {
  let url = `https://devapi.qweather.com/v7/weather/7d?key=${state.key}&location=${state.location}`
  await axios({
    url,
    method: 'get'
  }).then(({ data }) => {
    state.weatherInfo = data
    let daily = data.daily
    let dailyInfo = dayInfoTemplate.value
    dailyInfo.xAxis.data = []
    dailyInfo.series[0].data = []
    for (let i = 0; i < daily.length; i++) {
      let hour = daily[i]
      dailyInfo.xAxis.data[i] = hour.fxDate
      dailyInfo.series[0].data[i] = hour.tempMax
      dailyInfo.series[1].data[i] = hour.tempMin
    }
    state.dayInfo = dailyInfo
  })
}

const columns = ref([
  {
    title: '日期',
    key: 'fxDate'
  },
  {
    title() {
      return h(
        NGradientText,
        {
          type: 'info'
        },
        { default: () => '最低温' }
      )
    },
    key: 'tempMin',
    render(row: any) {
      return row.tempMin + '°C'
    }
  },
  {
    title() {
      return h(
        NGradientText,
        {
          type: 'danger'
        },
        { default: () => '最高温' }
      )
    },
    key: 'tempMax',
    render(row: any) {
      return row.tempMax + '°C'
    }
  },
  {
    title() {
      return h('span', { style: { color: '#000' } }, [
        h('i', { class: 'i-fe:daytime' }),
        h('span', { class: '' }, '白天天气')
      ])
    },
    key: 'textDay'
  },
  {
    title() {
      return h('span', { style: { color: '#000' } }, [
        h('i', { class: 'i-fe:night' }),
        h('span', { class: '' }, '夜晚天气')
      ])
    },
    key: 'textNight'
  },
  {
    title: '风向',
    key: 'windDirDay'
  },
  {
    title: '日出',
    key: 'sunrise'
  },
  {
    title: '日落',
    key: 'sunset'
  },
  {
    title: '湿度',
    key: 'humidity',
    render(row: any) {
      return row.humidity + '%'
    }
  },
  {
    title: '紫外线强度',
    key: 'uvIndex'
  }
])

const querySearchAsync = async () => {
  await axios({
    url: `https://geoapi.qweather.com/v2/city/lookup?key=${state.key}&location=${state.querySearchCity}`
  }).then(({ data }) => {
    if (data.code === '200') {
      cityOptions.value = data.location
      cityOptions.value = cityOptions.value.map((city: any) => {
        return {
          ...city,
          label: `${city.name} - ${city.adm2} - ${city.adm1}`,
          value: city.id
        }
      })
    }
  })
}

watch(
  () => state.querySearchCity,
  (val) => {
    if (val) querySearchAsync()
  }
)

const openCityEdit = () => {
  state.showEdit = true
}

const closeCityEdit = () => {
  state.showEdit = false
  searchInit()
}

const handleCitySelect = (city: string) => {
  state.location = city
}

const searchInit = () => {
  getNowInfo()
  get24Data()
  get7d()
  querySearchAsync()
}

onBeforeMount(() => {
  state.city = localStorage.getItem('city') || state.city
  state.location = localStorage.getItem('location') || state.location
  state.querySearchCity = state.city
})

onMounted(() => {
  searchInit()
})
</script>

<style lang="scss" scoped>
:deep(.n-descriptions-table-row) {
  .n-descriptions-table-header {
    width: 14%;
  }
}

:deep(.n-ellipsis) {
  span span {
    display: flex;
    gap: 2px;
  }
}
</style>
