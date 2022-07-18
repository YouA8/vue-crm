<!--
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 01:18:55
 * @LastEditors: hxl
 * @LastEditTime: 2021-06-27 21:40:20
-->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-container {
  height: 100%;
}
/* 解决滑动条问题 */
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
