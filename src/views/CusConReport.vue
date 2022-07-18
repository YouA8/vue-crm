<!--
 * @Description: 用户贡献分析
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-13 17:54:19
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:19:43
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户贡献分析</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" height="690px">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="CusName" label="客户姓名">
        </el-table-column>
        <el-table-column prop="Sum" label="总金额">
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
  name: 'CusConReport',
  data () {
    return {
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
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
      this.$http.get('customer/cuscon', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    searchInfo () {
      this.$http.get('customer/cuscon', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
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
