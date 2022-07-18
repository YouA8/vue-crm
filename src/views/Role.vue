<!--
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-08 00:18:38
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-13 17:00:38
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>营销管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input v-model="searchQuery.RoleName" type="text" size="medium" placeholder="角色名" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add()">添加</el-button>
        <el-button type="primary" size="medium" icon="el-icon-check" @click="grant()">授权</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="table" stripe border :data="tableData" height="630px">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="RoleName" label="角色名">
        </el-table-column>
        <el-table-column prop="Remarke" label="备注">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
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
    <el-dialog title="角色添加" width="30%" :visible.sync="addDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="角色名" :label-width="formLabelWidth">
              <el-input v-model="form.RoleName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色备注" :label-width="formLabelWidth">
              <el-input v-model="form.Remarke" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
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
    <el-dialog title="角色编辑" width="30%" :visible.sync="editDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="角色名" :label-width="formLabelWidth">
              <el-input v-model="form.RoleName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.Remarke" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权 -->
    <el-dialog title="角色授权" width="30%" :visible.sync="grantDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-tree ref="tree" :props="treeProps" :data="tree" show-checkbox :default-expanded-keys="idList" node-key="Id">
          </el-tree>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="grantDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="grantSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
      tableData: [],
      tree: [],
      ids: [],
      idList: [],
      searchQuery: {
        RoleName: null
      },
      addDialogVisible: false,
      editDialogVisible: false,
      grantDialogVisible: false,
      pageTotal: 40,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      form: {},
      treeProps: {
        label: 'ModuleName',
        children: 'Children'
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('role/pagelist', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    add () {
      this.form = {}
      this.addDialogVisible = true
    },
    searchInfo () {
      this.$http.get('role',
        { RoleName: this.searchQuery.RoleName, Page: this.currentPage, PageSize: this.pageSize }
      ).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        } else {
          this.tableData = []
          this.pageTotal = 0
        }
      })
    },
    edit (val) {
      this.form = val
      this.editDialogVisible = true
    },
    grant () {
      const rows = this.$refs.table.selection
      if (rows.length === 1) {
        this.$http.get('module').then(res => {
          if (res && res.data.Code === 1) {
            this.tree = res.data.Data
            this.$http.get(`role/${rows[0].Id}`).then(res => {
              if (res && res.data.Code === 1) {
                const per = res.data
                per.Permission.forEach(p => {
                  this.idList.push(p.Id)
                })
              }
            })
          }
        })
        this.grantDialogVisible = true
      } else {
        this.$message.error('请单选表格！')
      }
    },
    deleteSingle (val) {
      this.$http.delete('role', [val.Id]).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
        }
      })
    },
    deleteList () {
      this.$http.delete('role', this.ids).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
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
    addSubmit () {
      this.$http.post('role', this.form).then(res => {
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
      this.$http.put(`role/${this.form.Id}`, this.form).then(res => {
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
    grantSubmit () {
      var mids = this.$refs.tree.getCheckedKeys()
      var row = this.$refs.table.selection
      if (row.length === 1) {
        this.$http.post(`role/grant/${row[0].Id}`, mids).then(res => {
          if (res && res.data.Code === 1) {
            this.$message.success(res.data.Message)
            this.tree = []
            this.loadData()
            this.grantDialogVisible = false
          } else {
            this.$message.error(res.data.Message)
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
.but {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
.Dialog {
  height: 400px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
