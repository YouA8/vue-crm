<!--
 * @Description: 主页
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 23:41:29
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-07 02:12:27
-->

<template>
  <el-container>
    <el-scrollbar style="height:100%">
      <el-aside :width="awidth">
        <el-menu router :collapse="collapse">
          <template v-for="(item,index) in this.routes">
            <!-- v-if v-for 不能同时使用在一个标签 建议使用template或者计算属性筛出有用值-->
            <el-submenu v-if="!item.hidden" :key="index" :index="index+''">
              <template slot="title"><i class="el-icon-menu"></i><span>{{item.name}}</span></template>
              <el-menu-item :index="children.path" v-for="(children,index) in item.children" :key="index"><span>{{children.name}}</span></el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
    </el-scrollbar>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="collicon" @click="isCollapse()"></i>
        </div>
        <el-dropdown>
          <div class="user">
            <el-avatar shape="square" size="medium" :src="user.img"></el-avatar>
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changePwd()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
    <el-dialog title="用户编辑" width="30%" :visible.sync="cPwdDialogVisible">
      <div class="dialog">
        <el-scrollbar style="height:100%">
          <el-form class="form">
            <el-form-item label="旧密码" :label-width="formLabelWidth">
              <el-input v-model="form.OldUserPwd" type="text" size="medium" placeholder="请输入客户名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="form.NewUserPwd" type="text" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" :label-width="formLabelWidth">
              <el-input v-model="form.NewUserPwd" type="text" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="cPwdDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="cPwdSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: {
        img: ''
      },
      form: {},
      formLabelWidth: '100px',
      cPwdDialogVisible: false,
      collapse: false,
      awidth: '200px',
      collicon: 'el-icon-s-fold'
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
  },
  methods: {
    isCollapse () {
      this.collapse = !this.collapse
      this.awidth = this.awidth === 'auto' ? '200px' : 'auto'
      this.collicon = this.collicon === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    logout () {
      this.$confirm('此操作将退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空用户信息
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('menu')
        // 清空菜单
        this.$store.commit('initRoutes', [])
        this.$router.push('/login')
      }).catch(() => {
      })
    },
    changePwd () {
      this.form = {}
      this.cPwdDialogVisible = true
    },
    cPwdSubmit () {
      const user = JSON.parse(window.sessionStorage.getItem('user'))
      this.form.UserName = user.username
      this.$http.patch('user', this.form).then(res => {
        if (res && res.data.Code === 1) {
          this.$message.success(res.data.Message)
          this.cPwdDialogVisible = false
          this.form = {}
        } else {
          this.$message.error(res.data.Message)
        }
      })
    }
  }
}
</script>

<style scoped>
.el-aside {
  overflow: hidden;
}
.el-menu {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  background-color: #e9eef3;
  padding: 5px;
  height: 100%;
}
.dialog {
  height: 400px;
}
.form {
  padding-right: 20%;
  padding-left: 5%;
}
</style>
