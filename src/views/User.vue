<!--
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-10 21:26:39
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:20:40
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input v-model="searchQuery.UserName" type="text" size="medium" placeholder="用户名" auto-complete="off" />
        <el-input v-model="searchQuery.Email" type="text" size="medium" placeholder="邮箱" auto-complete="off" />
        <el-input v-model="searchQuery.Phone" type="text" size="medium" placeholder="手机号" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add()">添加</el-button>
        <el-button type="primary" size="medium" icon="el-icon-delete" @click="deleteList()">批量删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="userData" height="630px" @selection-change="selectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="UserName" label="用户名">
        </el-table-column>
        <el-table-column prop="Name" label="姓名">
        </el-table-column>
        <el-table-column prop="Email" label="邮箱">
        </el-table-column>
        <el-table-column prop="Phone" label="手机">
        </el-table-column>
        <el-table-column prop="Role.RoleName" label="角色">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteSingle(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="用户添加" width="30%" :visible.sync="addDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.UserName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.Name" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.Email" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="form.Role" size="medium" style="width:100%" placeholder="请选择指角色">
                <el-option v-for="item in options" :key="item.Id" :label="item.RoleName" :value="item.RoleName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="用户编辑" width="30%" :visible.sync="editDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.UserName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.Name" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.Email" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="form.RoleName" size="medium" style="width:100%" placeholder="请选择指角色">
                <el-option v-for="item in options" :key="item.Id" :label="item.RoleName" :value="item.RoleName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      userData: [],
      cusDevPlanData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      selectedList: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      ids: [],
      options: [],
      form: {},
      searchQuery: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('user', { PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.userData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    add () {
      this.roleOptions()
      this.addDialogVisible = true
    },
    roleOptions () {
      this.$http.get('role').then(res => {
        if (res && res.data.Code === 1) {
          this.options = res.data.Data
        }
      })
    },
    edit (val) {
      this.roleOptions()
      this.form = val
      this.editDialogVisible = true
    },
    deleteSingle (val) {
      this.$http.delete('user', [val.Id]).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
        }
      })
    },
    deleteList () {
      this.$http.delete('user', this.ids).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
        }
      })
    },
    searchInfo () {
      this.$http.post('user', { UserName: this.searchQuery.UserName, Email: this.searchQuery.Email, Phone: this.searchQuery.Phone, Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        } else {
          this.tableData = []
          this.pageTotal = 0
        }
      })
    },
    selectionChange (row) {
      this.ids = []
      row.forEach(val => {
        this.ids.push(val.Id)
      })
    },
    currentChange (val) {
      this.currentPage = val
    },
    sizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    addSubmit () {
      this.$http.post('user', this.form).then(res => {
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
    editSubmit () {
      this.$http.put(`user/${this.form.Id}`, this.form).then(res => {
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
.but {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
.dialog {
  height: 400px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
