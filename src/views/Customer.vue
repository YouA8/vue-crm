<!--
 * @Description: 客户信息管理
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-26 14:39:18
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-05 00:41:33
-->

<template>
  <el-scrollbar style="height:100%">
    <el-card class="card">
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索框组 -->
      <div class="search">
        <el-input v-model="searchQuery.Name" type="text" size="medium" placeholder="客户名" auto-complete="off" />
        <el-input v-model="searchQuery.Phone" type="text" size="medium" placeholder="客户编号" auto-complete="off" />
        <el-input v-model="searchQuery.Email" type="text" size="medium" placeholder="分配状态" auto-complete="off" />
        <el-button type="primary" size="medium" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
      </div>
      <!-- 按钮组 -->
      <div class="but">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="add()">添加</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="contact()">联系人管理</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="record()">交往记录</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="order()">订单管理</el-button>
      </div>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" height="630px">
        <el-table-column prop="Id" label="编号">
        </el-table-column>
        <el-table-column prop="Name" label="客户名">
        </el-table-column>
        <el-table-column prop="Contact" label="联系人">
        </el-table-column>
        <el-table-column prop="Phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="Email" label="邮箱">
        </el-table-column>
        <el-table-column prop="Address" label="地址">
        </el-table-column>
        <el-table-column prop="Level" label="客户等级">
        </el-table-column>
        <el-table-column prop="WebSite" label="网站">
        </el-table-column>
        <el-table-column prop="Myd" label="满意度">
        </el-table-column>
        <el-table-column prop="Xyd" label="信誉度">
        </el-table-column>
        <el-table-column prop="Description" label="描述">
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
      <!-- 添加对话框 -->
      <el-dialog title="客户管理--客户添加" width="30%" :visible.sync="addDialogVisible">
        <div class="Dialog">
          <el-scrollbar style="height:100%">
            <el-form class="form">
              <el-form-item label="客户名称" :label-width="formLabelWidth">
                <el-input v-model="form.Name" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input v-model="form.Contact" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.Email" type="text" size="medium" placeholder="请输入邮箱" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.Address" type="text" size="medium" placeholder="请输入地址" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="客户等级" :label-width="formLabelWidth">
                <el-input v-model="form.Level" type="text" size="medium" placeholder="请输入客户等级" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="网站" :label-width="formLabelWidth">
                <el-input v-model="form.WebSite" type="text" size="medium" placeholder="请输入网站" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="满意度" :label-width="formLabelWidth">
                <el-input v-model="form.Myd" type="text" size="medium" placeholder="请输入满意度" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="信誉度" :label-width="formLabelWidth">
                <el-input v-model="form.Xyd" type="text" size="medium" placeholder="请输入信誉度" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="form.Description" type="textarea" rows="5" size="medium" autocomplete="off"></el-input>
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
      <el-dialog title="客户管理--客户编辑" width="30%" :visible.sync="editDialogVisible">
        <div class="Dialog">
          <el-scrollbar style="height:100%">
            <el-form class="form">
              <el-form-item label="客户名称" :label-width="formLabelWidth">
                <el-input v-model="form.Name" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input v-model="form.Contact" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.Phone" type="text" size="medium" placeholder="请输入联系电话" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.Email" type="text" size="medium" placeholder="请输入邮箱" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.Address" type="text" size="medium" placeholder="请输入地址" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="客户等级" :label-width="formLabelWidth">
                <el-input v-model="form.Level" type="text" size="medium" placeholder="请输入客户等级" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="网站" :label-width="formLabelWidth">
                <el-input v-model="form.WebSite" type="text" size="medium" placeholder="请输入网站" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="满意度" :label-width="formLabelWidth">
                <el-input v-model="form.Myd" type="text" size="medium" placeholder="请输入满意度" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="信誉度" :label-width="formLabelWidth">
                <el-input v-model="form.Xyd" type="text" size="medium" placeholder="请输入信誉度" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="form.Description" type="textarea" rows="5" size="medium" autocomplete="off"></el-input>
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
  name: 'Customer',
  data () {
    return {
      tableData: [],
      searchQuery: {
        Name: null,
        Phone: null,
        Email: null
      },
      addDialogVisible: false,
      editDialogVisible: false,
      pageTotal: 40,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      formLabelWidth: '100px',
      form: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('customer', { Page: this.currentPage, PageSize: this.pageSize }).then(res => {
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
    contact () {

    },
    recode () {

    },
    order () {

    },
    edit (val) {
      this.form = val
      this.editDialogVisible = true
    },
    searchInfo () {
      this.$http.get('customer',
        { Name: this.searchQuery.Name, Email: this.searchQuery.Email, Phone: this.searchQuery.Phone, PageSize: this.pageSize }
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
    deleteSingle (val) {
      this.$http.delete('customer', [val.Id]).then(res => {
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
      this.$http.post('customer', this.form).then(res => {
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
      this.$http.put(`customer/${this.form.Id}`, this.form).then(res => {
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
