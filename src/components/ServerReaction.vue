<!--
 * @Description: 服务反馈
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-10-20 01:49:16
 * @LastEditors: hxl
 * @LastEditTime: 2021-10-24 02:13:59
-->

<template>
  <el-form>
    <el-form-item label="客户名" :label-width="formLabelWidth">
      <el-input v-model="form.Customer" type="text" size="medium" disabled placeholder="请输入客户名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" :label-width="formLabelWidth">
      <el-input v-model="form.ServerType" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务概要" :label-width="formLabelWidth">
      <el-input v-model="form.Overview" type="textarea" rows="5" size="medium" placeholder="请输入机会来源" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="请求内容" :label-width="formLabelWidth">
      <el-input v-model="form.Request" type="textarea" rows="5" size="medium" placeholder="请输入联系人" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分配人" :label-width="formLabelWidth">
      <el-input v-model="form.Assigner" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分配时间" :label-width="formLabelWidth">
      <el-input v-model="form.AssignorTime" type="text" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务处理" :label-width="formLabelWidth">
      <el-input v-model="form.ServiceHandle" type="textarea" rows="5" size="medium" disabled autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="处理时间" :label-width="formLabelWidth">
      <el-input v-model="form.ServiceHandleTime" type="text" disabled size="medium" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="处理结果" :label-width="formLabelWidth">
      <el-input v-model="form.ServiceHandleResult" type="text" size="medium" placeholder="请输入处理结果" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="满意度" :label-width="formLabelWidth">
      <el-input v-model="form.Myd" type="text" size="medium" placeholder="请输入满意度" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ServerReaction',
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
