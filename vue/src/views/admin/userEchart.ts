import * as echarts from 'echarts'
import useUtils from '@/composables/hd/useUtils'
const {generateRandomColor} = useUtils()


export const echart1 = (data: MonthCountsModel[]) => {
  const nameList = data.map(item => item.name)
  const valueList = data.map(item => item.value)
  return {
    title: {
      text: '',
    },
    tooltip: {},
    xAxis: {
      data: nameList,
    },
    yAxis: {
      minInterval: 1
    },
    series: [
      {
        name: '用户注册数量',
        type: 'bar',
        data: valueList,
      },
    ],
  }
}



export const echart2 = (data: MonthSoftCountsModel[]) => {
  if (data.length === 0) return
  const softNameList = data.map(item => item.name)
  let nameList = data[0].data.map(d => d.name)
  const series = data.map(v => {
    return {
      name: v.name,
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: generateRandomColor(),
          },
          {
            offset: 1,
            color: generateRandomColor(),
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: v.data.map(d => d.value),
    }
  })
  return {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: softNameList,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: nameList,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: series
  }
}

export const echart3 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120],
    },
    {
      name: 'Google',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 290, 230, 220],
    },
    {
      name: 'Bing',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series',
      },
      data: [60, 72, 71, 74, 190, 130, 110],
    },
  ],
}
export const echart4 = (data: MonthCountsModel[]) => {
  const nameList = data.map(item => item.name)
  const valueList = data.map(item => item.value)
  return {
    title: {
      text: '',
    },
    tooltip: {},
    xAxis: {
      data: nameList,
    },
    yAxis: {
      minInterval: 1
    },
    series: [
      {
        name: '软件发布数量',
        type: 'bar',
        data: valueList,
      },
    ],
  }
}
// export const echart4 = {
//   angleAxis: {},
//   radiusAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu'],
//     z: 10,
//   },
//   polar: {},
//   series: [
//     {
//       type: 'bar',
//       data: [1, 2, 3, 4],
//       coordinateSystem: 'polar',
//       name: 'A',
//       stack: 'a',
//       emphasis: {
//         focus: 'series',
//       },
//     },
//     {
//       type: 'bar',
//       data: [2, 4, 6, 8],
//       coordinateSystem: 'polar',
//       name: 'B',
//       stack: 'a',
//       emphasis: {
//         focus: 'series',
//       },
//     },
//     {
//       type: 'bar',
//       data: [1, 2, 3, 4],
//       coordinateSystem: 'polar',
//       name: 'C',
//       stack: 'a',
//       emphasis: {
//         focus: 'series',
//       },
//     },
//   ],
//   legend: {
//     show: true,
//     data: ['A', 'B', 'C'],
//   },
// }
