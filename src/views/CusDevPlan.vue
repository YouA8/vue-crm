<!--
 * @Description: 客户开发计划管理
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-08 00:24:18
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-13 16:29:53
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input v-model="searchQuery.CustomerName" type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input v-model="searchQuery.CreatorName" type="text" size="medium" placeholder="创建人" auto-complete="off" />
        <el-input v-model="searchQuery.State" type="text" size="medium" placeholder="开发状态" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="saleChanceData" height="690px" @selection-change="selectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="CustomerName" label="客户姓名">
        </el-table-column>
        <el-table-column prop="Probability" label="成功机率">
        </el-table-column>
        <el-table-column prop="Overview" label="概要">
        </el-table-column>
        <el-table-column prop="Contact" label="联系人">
        </el-table-column>
        <el-table-column prop="Phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="Description" label="描述">
        </el-table-column>
        <el-table-column prop="CreatorName" label="创建人">
        </el-table-column>
        <el-table-column prop="DevResult" label="开发状态">
          <template slot-scope="scope">
            <span v-if="scope.row.DevResult === 0">未开发</span>
            <span v-if="scope.row.DevResult === 1">开发中</span>
            <span v-if="scope.row.DevResult === 2">开发成功</span>
            <span v-if="scope.row.DevResult === 3">开发失败</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-tag v-if="(scope.row.DevResult === 0) || (scope.row.DevResult === 1)" size="mini" effect="dark" @click="detail(scope.row)">开发</el-tag>
            <el-tag v-if="(scope.row.DevResult === 2) || (scope.row.DevResult === 3)" type="warning" size="mini" effect="dark" @click="detail(scope.row)">详情</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
      <!-- 开发详情对话框 -->
      <el-dialog title="计划数据" width="40%" :visible.sync="detailDialogVisible">
        <div class="dialog">
          <el-scrollbar style="height:100%">
            <!-- 数据列表 -->
            <div class="datalist">
              <el-row>
                <el-col :span="12"><span>客户名称: {{this.datalist.CustomerName}}</span></el-col>
                <el-col :span="12"><span>机会来源: {{this.datalist.ChanceSource}}</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>联系人: {{this.datalist.Contact}}</span></el-col>
                <el-col :span="12"><span>联系电话: {{this.datalist.Phone}}</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>概要: {{this.datalist.Overview}}</span></el-col>
                <el-col :span="12"><span>成功机率: {{this.datalist.Probability}}</span></el-col>
              </el-row>
            </div>
            <!-- 按钮组 -->
            <div v-if="(currentSaleChance.DevResult === 0) || (currentSaleChance.DevResult === 1)" class="cusbut">
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addCusDevPlan()">添加</el-button>
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="planSuccess()">开发成功</el-button>
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="planError()">开发失败</el-button>
            </div>
            <!-- 客户计划表格 -->
            <el-table stripe border height="300px" :data="cusDevPlanData">
              <el-table-column prop="Id" label="编号">
              </el-table-column>
              <el-table-column prop="PlanCantext" label="计划项">
              </el-table-column>
              <el-table-column prop="ExeAffect" label="执行效果">
              </el-table-column>
              <el-table-column prop="PlanStartTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="PlanEndTime" label="结束时间">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="cusSizeChange" @current-change="cusCurrentChange" :current-page="cusCurrentPage" :page-sizes="cusPageSizes" :page-size="cusPageSize" layout="total, sizes, prev, pager, next, jumper" :total="cusPageTotal">
            </el-pagination>
          </el-scrollbar>
        </div>
        <div slot="footer">
          <el-button size="medium" @click="detailDialogVisible = false">返 回</el-button>
        </div>
      </el-dialog>
      <!-- 添加对话框 -->
      <el-dialog title="计划添加" width="30%" :visible.sync="addDialogVisible">
        <div class="dialog">
          <el-scrollbar style="height:100%">
            <el-form class="form">
              <el-form-item label="计划项内容" :label-width="formLabelWidth">
                <el-input v-model="form.PlanCantext" type="text" size="medium" placeholder="请输入计划项内容" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanStartTime" style="width:100%" size="medium" type="datetime" placeholder="选择开始时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanEndTime" style="width:100%" size="medium" type="datetime" placeholder="选择结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="计划项效果" :label-width="formLabelWidth">
                <el-input v-model="form.ExeAffect" type="text" size="medium" placeholder="请输入计划项效果" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <div slot="footer">
          <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'CuDevPlan',
  data () {
    return {
      saleChanceData: [],
      cusDevPlanData: [],
      searchQuery: {
        CustomerName: '',
        CreatorName: '',
        State: null
      },
      detailDialogVisible: false,
      addDialogVisible: false,
      selectedList: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      cusCurrentPage: 1,
      cusPageTotal: 10,
      cusPageSize: 3,
      cusPageSizes: [3, 5, 7],
      formLabelWidth: '100px',
      datalist: {},
      form: {},
      currentSaleChance: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('saleChance', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.saleChanceData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    loadCusData (val) {
      this.cusDevPlanData = []
      this.cusPageTotal = 0
      this.$http.get('cusdevplan', { SaleCanceId: val.Id, Page: this.cusCurrentPage, PageSize: this.cusPageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.cusDevPlanData = res.data.Data.list
          this.cusPageTotal = res.data.Data.total
        }
      })
    },
    detail (val) {
      this.datalist = val
      this.currentSaleChance = val
      this.loadCusData(val)
      this.detailDialogVisible = true
    },
    searchInfo () {
      this.$http.get('saleChance', { CustomerName: this.searchQuery.CustomerName, CreatorName: this.searchQuery.CreatorName, State: this.searchQuery.State, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.saleChanceData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        } else {
          this.saleChanceData = []
          this.pageTotal = 0
        }
      })
    },
    selectionChange (val) {
      this.selectedList = val
    },
    currentChange (val) {
      this.currentPage = val
    },
    sizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    cusCurrentChange (val) {
      this.cusCurrentPage = val
    },
    cusSizeChange (val) {
      this.cusPageSize = val
      this.cusCurrentPage = 1
    },
    addCusDevPlan () {
      this.addDialogVisible = true
    },
    addSubmit () {
      this.form.SaleChanceId = this.currentSaleChance.Id
      this.$http.post('cusdevplan', this.form).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.addDialogVisible = false
          this.form = {}
          this.loadData()
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    planSuccess () {
      this.datalist.DevResult = 2
      this.$http.patch(`salechance/${this.datalist.Id}`, this.datalist).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.editDialogVisible = false
          this.form = {}
          this.loadData()
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    planError () {
      this.datalist.DevResult = 3
      this.$http.patch(`salechance/${this.datalist.Id}`, this.datalist).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.editDialogVisible = false
          this.form = {}
          this.loadData()
        } else {
          this.$message.error(res.data.Message)
        }
      })
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
.dialog {
  height: 450px;
}
.datalist {
  margin-bottom: 10px;
}
.datalist .el-row {
  margin-bottom: 15px;
  font-size: 18px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
