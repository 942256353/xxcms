<script setup lang="ts">
import { ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { echart1, echart2, echart3, echart4 } from './echart'
import useAdmin from '../../composables/hd/useAdmin'
const {getAll,collections}  = useAdmin()
const cards = ref<ICard[]>([
  {
    title: '当月注册用户数量',
    monthCount: 0,
    iconColor: 'text-violet-500',
    icon: 'fas fa-address-card',
    total: 0,
    totalTitle: '总用户数量',
  },
  {
    title: '当月软件发布数量',
    monthCount: 0,
    iconColor: 'text-green-600',
    icon: 'fas fa-apple-alt',
    total: 0,
    totalTitle: '总软件发布数量',
  },
  {
    title: '当月软件下载次数',
    monthCount: 0,
    iconColor: 'text-blue-500',
    icon: 'fas fa-award',
    total: 0,
    totalTitle: '总下载次数',
  },
  {
    title: '当月评论数量',
    monthCount: 0,
    iconColor: 'text-red-500',
    icon: 'fas fa-baseball-ball',
    total: 0,
    totalTitle: '总评论数量',
  },
])
onMounted(async()=>{
  await getAll()
  const cardData = collections.value as AdminModel
  cards.value[0].monthCount = cardData.currentMonthUsers
  cards.value[0].total = cardData.userTotal
  cards.value[1].monthCount = cardData.currentMonthSofts
  cards.value[1].total = cardData.softTotal
  cards.value[2].monthCount = cardData.currentMonthDownloads
  cards.value[2].total = cardData.downloadTotal
  cards.value[3].monthCount = cardData.currentMonthComments
  cards.value[3].total = cardData.commentTotal
})

interface ICard {
  title: string
  monthCount: number
  icon: string
  iconColor: string
  totalTitle: string
  total: number
}


nextTick(() => {
  echarts.init(document.getElementById('echart1') as HTMLDivElement).setOption(echart1)
  echarts.init(document.getElementById('echart2') as HTMLDivElement).setOption(echart2)
  echarts.init(document.getElementById('echart3') as HTMLDivElement).setOption(echart3)
  echarts.init(document.getElementById('echart4') as HTMLDivElement).setOption(echart4)
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-100">
      <el-card
        shadow="hover"
        :body-style="{ padding: '20px' }"
        v-for="(card, index) of cards"
        :key="index"
        class="cursor-pointer">
        <template #header>
          <div class="flex justify-between items-center">
            {{ card.title }}
            <el-tag type="danger" size="small" effect="dark">月</el-tag>
          </div>
        </template>

        <section class="flex mt-3 justify-between items-center">
          <span class="text-3xl">{{ card.total }}</span>
          <i :class="[card.icon, card.iconColor]" class="text-5xl"></i>
        </section>
        <section class="text-base mt-6 flex justify-between">
          {{ card.totalTitle }}
          <span class>{{ card.total }}</span>
        </section>
      </el-card>
    </div>

    <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header> 用户统计 </template>
        <div id="echart1" class="h-72"></div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header> 销售额 </template>
        <div id="echart2" class="h-72"></div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header> 搜索来源 </template>
        <div id="echart3" class="h-72"></div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header> 订单分析 </template>
        <div id="echart4" class="h-72"></div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss"></style>
@/composables/hd/useAdmin