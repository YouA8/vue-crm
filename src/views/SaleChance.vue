<!--
 * @Description: 营销机会管理
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-26 14:34:36
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:39:03
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>营销机会管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input v-model="searchQuery.CustomerName" type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input v-model="searchQuery.CreatorName" type="text" size="medium" placeholder="创建人" auto-complete="off" />
        <el-input v-model="searchQuery.AssignorName" type="text" size="medium" placeholder="分配人" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add()">添加</el-button>
        <el-button type="primary" size="medium" icon="el-icon-delete" @click="deleteList()">批量删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" height="630px" @selection-change="selectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="CustomerName" label="客户姓名">
        </el-table-column>
        <el-table-column prop="ChanceSource" label="机会来源">
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
        <el-table-column prop="AssignorName" label="分配人">
        </el-table-column>
        <el-table-column prop="AssignTime" width="210px" label="分配时间">
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
    <el-dialog title="机会添加" width="30%" :visible.sync="addDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input v-model="form.CustomerName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机会来源" :label-width="formLabelWidth">
              <el-input v-model="form.ChanceSource" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input v-model="form.Contact" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="概要" :label-width="formLabelWidth">
              <el-input v-model="form.Overview" type="text" size="medium" placeholder="请输入概要" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成功几率" :label-width="formLabelWidth">
              <el-input v-model="form.Probability" type="text" size="medium" placeholder="请输入成功几率" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机会描述" :label-width="formLabelWidth">
              <el-input v-model="form.Description" type="textarea" rows="5" size="medium" placeholder="请输入机会描述" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指派人" :label-width="formLabelWidth">
              <el-select v-model="form.AssignorName" size="medium" style="width:100%" placeholder="请选择指派人">
                <el-option v-for="item in options" :key="item.Id" :label="item.Name" :value="item.Name">
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
    <el-dialog title="机会编辑" width="30%" :visible.sync="editDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input v-model="form.CustomerName" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机会来源" :label-width="formLabelWidth">
              <el-input v-model="form.ChanceSource" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input v-model="form.Contact" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="概要" :label-width="formLabelWidth">
              <el-input v-model="form.Overview" type="text" size="medium" placeholder="请输入概要" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成功几率" :label-width="formLabelWidth">
              <el-input v-model="form.Probability" type="text" size="medium" placeholder="请输入成功几率" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机会描述" :label-width="formLabelWidth">
              <el-input v-model="form.Description" type="textarea" :rows="3" size="medium" placeholder="请输入机会描述" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指派人" :label-width="formLabelWidth">
              <el-select v-model="form.AssignorName" size="medium" style="width:100%" placeholder="请选择指派人">
                <el-option v-for="item in options" :key="item.Id" :label="item.Name" :value="item.Name">
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
  name: 'Market',
  data () {
    return {
      tableData: [],
      ids: [],
      searchQuery: {
        CustomerName: '',
        CreatorName: '',
        AssignorName: ''
      },
      addDialogVisible: false,
      editDialogVisible: false,
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      options: [],
      form: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('saleChance', { PageSize: this.pageSize }).then(res => {
        if (res && res.data.Code === 1) {
          this.tableData = res.data.Data.list
          this.pageTotal = res.data.Data.total
        }
      })
    },
    add () {
      this.form = {}
      this.assignorOption()
      this.addDialogVisible = true
    },
    searchInfo () {
      this.$http.get('saleChance',
        { CustomerName: this.searchQuery.CustomerName, AssignorName: this.searchQuery.AssignorName, CreatorName: this.searchQuery.CreatorName, Page: this.currentPage, PageSize: this.pageSize }
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
      this.assignorOption()
      this.editDialogVisible = true
    },
    assignorOption () {
      this.$http.get('user/sale').then(res => {
        if (res && res.data.Code === 1) {
          this.options = res.data.Data
        }
      })
    },
    deleteSingle (val) {
      this.$http.delete('saleChance', [val.Id]).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.loadData()
        }
      })
    },
    deleteList () {
      this.$http.delete('saleChance', this.ids).then(res => {
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
    selectionChange (row) {
      this.ids = []
      row.forEach(val => {
        this.ids.push(val.Id)
      })
    },
    addSubmit () {
      const user = JSON.parse(window.sessionStorage.getItem('user'))
      this.form.CreatorName = user.username
      this.$http.post('saleChance', this.form).then(res => {
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
      this.$http.put(`saleChance/${this.form.Id}`, this.form).then(res => {
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
  height: 450px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
