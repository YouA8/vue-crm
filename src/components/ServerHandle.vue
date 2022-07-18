<!--
 * @Description: 服务处理
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-10-20 01:46:56
 * @LastEditors: hxl
 * @LastEditTime: 2021-10-24 02:14:09
-->

<template>
  <el-form>
    <el-form-item label="客户名称" :label-width="formLabelWidth">
      <el-input v-model="form.Customer" type="text" disabled size="medium"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" :label-width="formLabelWidth">
      <el-input v-model="form.ServerType" type="text" size="medium" disabled></el-input>
    </el-form-item>
    <el-form-item label="服务概要" :label-width="formLabelWidth">
      <el-input v-model="form.Overview" type="textarea" rows="5" size="medium" placeholder="请输入服务概要" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="请求内容" :label-width="formLabelWidth">
      <el-input v-model="form.Request" type="textarea" rows="5" size="medium" placeholder="请输入请求内容" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分配人" :label-width="formLabelWidth">
      <el-input v-model="form.Assigner" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分配时间" :label-width="formLabelWidth">
      <el-input v-model="form.AssignorTime" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务处理" :label-width="formLabelWidth">
      <el-input v-model="form.ServiceHandle" type="textarea" rows="5" size="medium" placeholder="请输入处理内容" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ServerHandle',
  data () {
    return {
      form: {},
      formLabelWidth: '100px'
    }
  },
  props: ['cform'],
  mounted () {
    this.loadform()
  },
  methods: {
    loadform () {
      this.form = this.cform
    },
    formData () {
      return this.form
    }
  }
}
</script>

<style>
</style>
