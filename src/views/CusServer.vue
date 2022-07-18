<!--
 * @Description: 客户服务
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-10-18 20:13:54
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-13 16:59:53
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户服务</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input type="text" size="medium" placeholder="类型" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add()">服务添加</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handle()">服务处理</el-button>
        <el-button type="primary" size="medium" icon="el-icon-delete" @click="deleteList()">服务删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="table" stripe border :data="tableData" height="630px" @selection-change="selectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="Customer" label="客户名">
        </el-table-column>
        <el-table-column prop="ServerType" label="服务类型">
        </el-table-column>
        <el-table-column prop="Overview" label="概要信息">
        </el-table-column>
        <el-table-column prop="Request" label="服务请求">
        </el-table-column>
        <el-table-column prop="Assigner" label="分配人">
        </el-table-column>
        <el-table-column prop="AssignTime" label="分配时间">
        </el-table-column>
        <el-table-column prop="Creator" label="创建人">
        </el-table-column>
        <el-table-column prop="ServiceHandler" label="处理人">
        </el-table-column>
        <el-table-column prop="ServiceHandle" label="处理内容">
        </el-table-column>
        <el-table-column prop="ServiceHandleTime" label="处理时间">
        </el-table-column>
        <el-table-column prop="ServiceHandleResult" label="处理结果">
        </el-table-column>
        <el-table-column prop="Myd" label="满意度">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="服务添加" width="30%" :visible.sync="addDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="客户名" :label-width="formLabelWidth">
              <el-input v-model="form.Customer" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" :label-width="formLabelWidth">
              <el-select v-model="form.ServerType" placeholder="请选择" style="width:100%">
                <el-option v-for="item in options" :key="item.Id" :label="item.ServerType" :value="item.ServerType">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务概要" :label-width="formLabelWidth">
              <el-input v-model="form.Overview" type="textarea" rows="5" size="medium" placeholder="请输入服务概要" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务请求" :label-width="formLabelWidth">
              <el-input v-model="form.Request" type="textarea" rows="5" size="medium" placeholder="请输入服务请求" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 处理对话框 -->
    <el-dialog title="服务处理" width="30%" :visible.sync="handleDialogVisible">
      <div class="dialog" style="height:500px">
        <el-scrollbar style="height:100%">
          <el-steps align-center :active="active" finish-status="success">
            <el-step title="服务分配"></el-step>
            <el-step title="服务处理"></el-step>
            <el-step title="服务反馈"></el-step>
          </el-steps>
          <el-divider></el-divider>
          <component ref="com" :cform="pform" class="com" :is="currentVue"></component>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="handleDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="handleSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'CusServer',
  data () {
    return {
      ids: [],
      tableData: [],
      searchQuery: {

      },
      pform: {},
      addDialogVisible: false,
      handleDialogVisible: false,
      pageTotal: 40,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      form: {},
      active: '',
      options: [],
      currentVue: '',
      currentCusServer: {}
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    ServerAssign: () => import('@/components/ServerAssign'),
    ServerHandle: () => import('@/components/ServerHandle'),
    ServerReaction: () => import('@/components/ServerReaction')
  },
  methods: {
    loadData () {
      this.$http.get('cusserver', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    searchInfo () {
      this.$http.get('cusserver', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
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
    },
    setCurrentVue (val) {
      if (val === 2) {
        this.currentVue = 'ServerAssign'
      } else if (val === 3) {
        this.currentVue = 'ServerHandle'
      } else if (val === 4) {
        this.currentVue = 'ServerReaction'
      }
    },
    add () {
      this.getServerType()
      this.addDialogVisible = true
    },
    addSubmit () {
      const user = JSON.parse(window.sessionStorage.getItem('user'))
      this.form.Creator = user.name
      this.$http.post('cusserver', this.form).then(res => {
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
    getServerType () {
      this.$http.get('cusserver/servertype').then(res => {
        if (res && res.data.Code === 1) {
          this.options = res.data.Data
        }
      })
    },
    handle () {
      this.pform = {}
      this.form = {}
      const rows = this.$refs.table.selection
      if (rows.length === 1) {
        this.currentCusServer = rows[0]
        this.pform = this.currentCusServer
        const state = this.currentCusServer.State
        this.active = state - 1 <= 0 ? 0 : state - 1
        this.setCurrentVue(state + 1)
        this.handleDialogVisible = true
      } else {
        this.$message.error('请单选表格！')
      }
    },
    handleSubmit () {
      const f = this.$refs.com.formData()
      f.State = f.State + 1
      this.$http.put(`cusserver/${this.currentCusServer.Id}`, f).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.handleDialogVisible = false
          this.form = {}
          this.pform = {}
          this.loadData()
        } else {
          this.$message.error(res.data.Message)
        }
      })
    },
    selectionChange (row) {
      this.ids = []
      row.forEach(val => {
        this.ids.push(val.Id)
      })
    },
    deleteList () {
      if (this.ids.length !== 0) {
        this.$http.delete('cusserver', this.ids).then(res => {
          if (res && res.data.Code === 1) {
            this.$message.success(res.data.Message)
            this.loadData()
          }
        })
      }
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
.but {
  margin-top: 20px;
}
.el-container {
  height: 100%;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
.dialog {
  height: 450px;
}
.com {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
