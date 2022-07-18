<!--
 * @Description: 客户流失报表
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-14 00:03:13
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:43:45
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户流失报表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" height="690px">
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="CusName" label="客户名">
        </el-table-column>
        <el-table-column prop="CusManager" label="客户经理">
        </el-table-column>
        <el-table-column prop="LastOrderTime" label="最后下单时间">
        </el-table-column>
        <el-table-column prop="LossReason" label="流失原因">
        </el-table-column>
        <el-table-column prop="ConfirmLossTime" label="确认流失时间">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'CusLossReport',
  data () {
    return {
      tableData: [],
      searchQuery: {

      },
      pageTotal: 40,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20]
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('cusloss', { Page: this.currentPage, PageSize: this.pageSize, State: 1 }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    searchInfo () {
      this.$http.get('cusloss', { Page: this.currentPage, PageSize: this.pageSize, State: 1 }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        } else {
          this.tableData = []
          this.pageTotal = 0
        }
      })
    },
    currentChange (val) {
      this.currentPage = val
    },
    sizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
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
.search .el-input {
  width: 200px;
  margin-right: 10px;
  margin-top: 10px;
}
.el-table {
  margin-top: 30px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
