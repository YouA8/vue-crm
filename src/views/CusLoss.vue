<!--
 * @Description: 客户流失管理
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-13 16:56:02
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:44:11
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户流失管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input type="text" size="medium" placeholder="客户编号" auto-complete="off" />
        <el-input type="text" size="medium" placeholder="分配状态" auto-complete="off" />
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
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.State === 1" type="info" size="mini" effect="dark" @click="cusRep(scope.row)">详情</el-tag>
            <el-tag v-if="scope.row.State === 0" type="warning" size="mini" effect="dark" @click="cusRep(scope.row)">添加暂缓</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
      <!-- 暂缓对话框 -->
      <el-dialog title="暂缓数据" width="40%" :visible.sync="cusRepDialogVisible">
        <div class="dialog">
          <el-scrollbar style="height:100%">
            <!-- 数据列表 -->
            <div class="datalist">
              <el-row>
                <el-col :span="12"><span>客户编号: {{this.datalist.Id}}</span></el-col>
                <el-col :span="12"><span>流失原因: {{this.datalist.LossReason}}</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>客户名称: {{this.datalist.CusName}}</span></el-col>
                <el-col :span="12"><span>流失时间: {{this.datalist.ConfirmLossTime}}</span></el-col>
              </el-row>
            </div>
            <!-- 按钮组 -->
            <div v-if="(currentCusLoss.State === 0)" class="cusbut">
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addCusRepPlan()">添加暂缓计划</el-button>
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="confirmLoss()">确认流失</el-button>
            </div>
            <!-- 暂缓措施表格 -->
            <el-table stripe border height="300px" :data="cusRepData">
              <el-table-column prop="Id" label="编号">
              </el-table-column>
              <el-table-column prop="Measure" label="暂缓措施">
              </el-table-column>
              <el-table-column prop="ExeAffect" label="执行结果">
              </el-table-column>
              <el-table-column prop="PlanStartTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="PlanEndTime" label="结束时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteSingle(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="cusRepSizeChange" @current-change="cusRepCurrentChange" :current-page="cusRepCurrentPage" :page-sizes="cusRepPageSizes" :page-size="cusRepPageSize" layout="total, sizes, prev, pager, next, jumper" :total="cusRepTotal">
            </el-pagination>
          </el-scrollbar>
        </div>
        <div slot="footer">
          <el-button size="medium" @click="cusRepDialogVisible = false">返 回</el-button>
        </div>
      </el-dialog>
      <!-- 添加对话框 -->
      <el-dialog title="计划添加" width="30%" :visible.sync="addPlanDialogVisible">
        <div class="dialog">
          <el-scrollbar style="height:100%">
            <el-form class="form">
              <el-form-item label="措施内容" :label-width="formLabelWidth">
                <el-input v-model="form.Measure" type="text" size="medium" placeholder="请输入计划项内容" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanStartTime" style="width:100%" size="medium" type="datetime" placeholder="选择开始时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanEndTime" style="width:100%" size="medium" type="datetime" placeholder="选择结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="执行效果" :label-width="formLabelWidth">
                <el-input v-model="form.ExeAffect" type="text" size="medium" placeholder="请输入计划项效果" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <div slot="footer">
          <el-button size="medium" @click="addPlanDialogVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑对话框 -->
      <el-dialog title="计划编辑" width="30%" :visible.sync="editDialogVisible">
        <div class="dialog">
          <el-scrollbar style="height:100%">
            <el-form class="form">
              <el-form-item label="措施内容" :label-width="formLabelWidth">
                <el-input v-model="form.Measure" type="text" size="medium" placeholder="请输入计划项内容" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanStartTime" style="width:100%" size="medium" type="datetime" placeholder="选择开始时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.PlanEndTime" style="width:100%" size="medium" type="datetime" placeholder="选择结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="执行效果" :label-width="formLabelWidth">
                <el-input v-model="form.ExeAffect" type="text" size="medium" placeholder="请输入计划项效果" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <div slot="footer">
          <el-button size="medium" @click="editDialogVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="editSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'CusLoss',
  data () {
    return {
      tableData: [],
      cusRepData: [],
      datalist: {},
      cusRepDialogVisible: false,
      addPlanDialogVisible: false,
      editDialogVisible: false,
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      cusRepCurrentPage: 1,
      cusRepTotal: 0,
      cusRepPageSize: 3,
      cusRepPageSizes: [3, 5, 7],
      currentCusLoss: {},
      currentCusRep: {},
      form: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('cusloss', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    loadCusRepData (val) {
      this.cusRepData = []
      this.cusRepTotal = 0
      this.$http.get('cusreprieve', { LossId: val.Id, Page: this.currentPage, PageSize: this.cusRepPageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.cusRepData = res.data.Data.list
          this.cusRepTotal = res.data.Data.total
        }
      })
    },
    cusRep (val) {
      this.datalist = val
      this.currentCusLoss = val
      this.loadCusRepData(val)
      this.cusRepDialogVisible = true
    },
    searchInfo () {
      this.$http.get('cusloss', { PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    edit (val) {
      this.form = val
      this.currentCusRep = val
      this.editDialogVisible = true
    },
    deleteSingle (val) {
      this.$http.delete('cusreprieve', val.Id).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
        }
      })
    },
    addCusRepPlan () {
      this.form = {}
      this.addPlanDialogVisible = true
    },
    editSubmit () {
      this.$http.put(`cusreprieve/${this.currentCusRep.Id}`, this.form).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.editDialogVisible = false
          this.form = {}
          this.loadCusRepData(this.currentCusLoss)
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    addSubmit () {
      this.form.LossId = this.currentCusLoss.Id
      this.$http.post('cusreprieve', this.form).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.addPlanDialogVisible = false
          this.form = {}
          this.loadCusRepData(this.currentCusLoss)
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    // 有问题
    confirmLoss () {
      this.$prompt('请输入流失原因！', '流失确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        // 问题点
        const str = JSON.stringify(value)
        console.log(str)
        this.$http.patch(`cusloss/${this.currentCusLoss.Id}`, str).then(res => {
          if (res && res.data.Code === 1) {
            this.$message.success(res.data.Message)
            this.loadData()
            this.cusRepDialogVisible = false
          } else {
            this.$message.error(res.data.Message)
          }
        })
      }).catch(() => {
      })
    },
    currentChange (val) {
      this.currentPage = val
    },
    sizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    cusRepCurrentChange (val) {
      this.cusRepCurrentPage = val
    },
    cusRepSizeChange (val) {
      this.cusRepPageSize = val
      this.cusRepCurrentPage = 1
    }
  }
}
</script>

<style scoped>
.card {
  width: 1700px;
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
  height: 400px;
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
