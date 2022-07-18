<!--
 * @Description: 登录页面
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 22:30:05
 * @LastEditors: hxl
 * @LastEditTime: 2022-06-15 03:05:54
-->

<template>
  <div class="container">
    <el-form ref="form" :model="form" class="login-form" :rules="rules">
      <h2 class="login-title">登录</h2>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" autocomplete="false" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" autocomplete="false" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="code">
        <div style="display:flex">
          <el-input type="text" v-model="form.code" placeholder="点击图片更换验证码" style="width:220px;margin-right:5px" />
          <el-image :src="captchaUrl" @click="updateCaptcha()" />
        </div>
      </el-form-item>
      <el-checkbox v-model="checked" style="margin-bottom:15px;"><strong>同意用户协议</strong></el-checkbox>
      <el-button type="primary" style="width:100%;" :loading="loginloding" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    return {
      captchaUrl: this.$http.baseURL + 'login/captcha?t=' + new Date(),
      form: {},
      checked: '',
      loginloding: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到12  个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到12  个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.checked === true) {
            this.loginloding = true
            this.getMD5Pwd(this.form.password).then(res => {
              const md5pwd = res
              this.$http.post('login', { UserName: this.form.username, PassWord: md5pwd, VaildCode: this.form.code }).then(res => {
                if (res && res.data.Data !== null) {
                  // 存储用户token
                  const tokenStr = res.data.Data.Token
                  const username = res.data.Data.UserName
                  window.sessionStorage.setItem('user', JSON.stringify({ username: username, tokenStr: tokenStr }))
                  this.loginloding = false
                  this.form = {}
                  this.$router.push('/home')
                } else {
                  this.loginloding = false
                  this.form = {}
                  this.$message.error(res.data.Message)
                }
              })
            })
          } else {
            this.$message({
              message: '请同意用户协议！',
              type: 'info'
            })
          }
        }
      })
    },
    updateCaptcha () {
      this.captchaUrl = this.$http.baseURL + 'login/captcha?t=' + new Date()
    },
    async getMD5Pwd (val) {
      const res = await this.$http.get('/login/salt')
      return CryptoJS.MD5(val + res.data.Data).toString()
    }
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  background: url("../assets/loginbg.jpg") no-repeat;
  background-size: cover;
}
.login-form {
  width: 280px;
  height: 350px;
  padding: 15px 35px 15px 35px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 15px gray;
  border-radius: 5px;
}
.login-title {
  text-align: center;
}
</style>
