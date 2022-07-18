<!--
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-08-11 23:54:18
 * @LastEditors: hxl
 * @LastEditTime: 2021-09-21 01:25:10
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="allUnFlod()">全部展开</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="allFold()">全部折叠</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addMenu()">添加目录</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="table" stripe border :data="tableData" height="718px" row-key="Id" :tree-props="{children: 'Children'}">
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="ModuleName" label="菜单名称">
        </el-table-column>
        <el-table-column prop="Url" label="URL">
        </el-table-column>
        <el-table-column prop="ModuleStyle" label="菜单类型">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-tag type="info" size="mini" effect="dark" @click="addSub(scope.row)">添加子项</el-tag>
            <el-tag type="info" size="mini" effect="dark" style="margin-left:10px" @click="edit(scope.row)">编辑</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加目录对话框 -->
    <el-dialog title="添加目录" width="30%" :visible.sync="addDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="菜单名称" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleName" type="text" size="medium" placeholder="请输入菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Url" :label-width="formLabelWidth">
              <el-input v-model="form.Url" type="text" size="medium" placeholder="请输入URL" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleStyle" type="text" size="medium" placeholder="请输入菜单类型" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="层级" :label-width="formLabelWidth">
              <el-input v-model="form.Grade" type="text" size="medium" placeholder="请输入菜单层级" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.Order" type="text" size="medium" placeholder="请输入排序" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加子项对话框 -->
    <el-dialog title="添加子项" width="30%" :visible.sync="addSubDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="菜单名称" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleName" type="text" size="medium" placeholder="请输入菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Url" :label-width="formLabelWidth">
              <el-input v-model="form.Url" type="text" size="medium" placeholder="请输入URL" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleStyle" type="text" size="medium" placeholder="请输入菜单类型" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="层级" :label-width="formLabelWidth">
              <el-input v-model="form.Grade" type="text" size="medium" placeholder="请输入菜单层级" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.Order" type="text" size="medium" placeholder="请输入排序" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="addSubDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSubSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="菜单编辑" width="30%" :visible.sync="editDialogVisible">
      <div class="Dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="菜单名称" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleName" type="text" size="medium" placeholder="请输入菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Url" :label-width="formLabelWidth">
              <el-input v-model="form.Url" type="text" size="medium" placeholder="请输入URL" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" :label-width="formLabelWidth">
              <el-input v-model="form.ModuleStyle" type="text" size="medium" placeholder="请输入菜单类型" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="层级" :label-width="formLabelWidth">
              <el-input v-model="form.Grade" type="text" size="medium" placeholder="请输入菜单层级" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.Order" type="text" size="medium" placeholder="请输入排序" autocomplete="off"></el-input>
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
  name: 'Menu',
  data () {
    return {
      tableData: [],
      ids: [],
      PId: 0,
      addDialogVisible: false,
      addSubDialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: '100px',
      form: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('module').then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data
        }
      })
    },
    addMenu () {
      this.form = {}
      this.form.Grade = 0
      this.addDialogVisible = true
    },
    allFold () {
      this.expandTable(this.tableData, false)
    },
    allUnFlod () {
      this.expandTable(this.tableData, true)
    },
    expandTable (arr, isExpand) {
      arr.forEach(r => {
        this.$refs.table.toggleRowExpansion(r, isExpand)
        if (r.Children) {
          this.expandTable(r.Children, isExpand)
        }
      })
    },
    addSub (val) {
      this.form = {}
      this.PId = val.Id
      this.form.Grade = val.Grade + 1
      if (this.form.Grade <= 2) {
        this.addSubDialogVisible = true
      } else {
        this.$message.error('暂不支持添加该级菜单')
      }
    },
    edit (val) {
      this.form = val
      this.editDialogVisible = true
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
    addSubmit () {
      this.$http.post('module', this.form).then(res => {
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
    addSubSubmit () {
      this.$http.post('module', this.form).then(res => {
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
      this.$http.put(`module/${this.form.Id}`, this.form).then(res => {
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
.Dialog {
  height: 400px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
