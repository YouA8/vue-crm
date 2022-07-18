<!--
 * @Description: 服务分配
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-10-20 01:45:27
 * @LastEditors: hxl
 * @LastEditTime: 2021-10-24 01:44:26
-->

<template>
  <el-form>
    <el-form-item label="客户名称" :label-width="formLabelWidth">
      <el-input v-model="form.Customer" type="text" size="medium" disabled placeholder="请输入客户名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" :label-width="formLabelWidth">
      <el-input v-model="form.ServerType" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务概要" :label-width="formLabelWidth">
      <el-input v-model="form.Overview" type="textarea" rows="5" size="medium" placeholder="请输入服务概要" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务请求" :label-width="formLabelWidth">
      <el-input v-model="form.Request" type="textarea" rows="5" size="medium" placeholder="请输入服务内容" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分配人" :label-width="formLabelWidth">
      <el-select v-model="form.Assigner" placeholder="请选择" style="width:100%">
        <el-option v-for="item in options" :key="item.Id" :label="item.Name" :value="item.Name">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ServerAssign',
  data () {
    return {
      formLabelWidth: '100px',
      form: {},
      options: []
    }
  },
  props: ['cform'],
  mounted () {
    this.loadform()
    this.user()
  },
  methods: {
    loadform () {
      this.form = this.cform
    },
    user () {
      this.$http.get('user/sale').then(res => {
        if (res && res.data.Code === 1) {
          this.options = res.data.Data
        }
      })
    },
    formData () {
      return this.form
    }
  }
}
</script>

<style>
</style>
