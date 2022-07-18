<!--
 * @Description: 客户组成分析
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-13 18:07:30
 * @LastEditors: hxl
 * @LastEditTime: 2021-10-25 03:35:46
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户构成分析</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div>
          <div class="chart1" ref="chart1" style="width: 700px;height:400px;">
          </div>
          <div class="chart2" ref="chart2" style="width: 700px;height:400px;">
          </div>
        </div>
      </div>
    </el-card>
  </el-scrollbar>
</template>

<script>
const Echarts = require('echarts')
export default {
  name: 'CusMakeReport',
  data () {
    return {
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('customer/cusmake').then(res => {
        if (res && res.data.Code === 1) {
          const chartData = res.data.Data
          const chartxvalue = []
          const chartyvalue = []
          const chartArray = []
          chartData.forEach((value) => {
            chartxvalue.push(value.Level == null ? '其他' : value.Level)
            chartyvalue.push(value.Total)
          })
          chartData.forEach((v) => {
            chartArray.push({ value: v.Total, name: v.Level == null ? '其他' : v.Level })
          })
          this.chart1init(chartxvalue, chartyvalue)
          this.chart2init(chartArray)
        }
      })
    },
    chart1init (chartxvalue, chartyvalue) {
      const echart = Echarts.init(this.$refs.chart1)
      const option = {
        title: {
          text: '客户构成',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: chartxvalue
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: chartyvalue,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      echart.setOption(option)
    },
    chart2init (chartArray) {
      const echart = Echarts.init(this.$refs.chart2)
      const option = {
        title: {
          text: '客户构成',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '客户构成',
            type: 'pie',
            radius: '50%',
            data: chartArray,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      echart.setOption(option)
    }
  }
}
</script>

<style scoped>
.card {
  width: 1700px;
  height: 100%;
}
.card-collapse {
  width: 1840px;
  height: 100%;
}
.box {
  display: flex;
  justify-content: center;
}
</style>
