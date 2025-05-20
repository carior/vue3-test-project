<template>
  <div class="about">
      <el-button type="primary">我是pc主页</el-button>
      <el-button type="primary" @click="totiao('pc')">PC</el-button>
      <el-button type="primary" @click="totiao('admin')">admin</el-button>
      <el-button type="primary" @click="getUserList">获取用户</el-button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const totiao = (path) => {
  router.push(path)
}
// 获取用户
function getUserList(row) { 
    // axios.get('http://localhost:8888/api/user').then(res => {
    axios.get('http://localhost:8888/api/user/list').then(res => {
         console.log(res, '/user/list');
        if (res.status == 200) {
             console.log(res,'res');
             tableData.value = res.data.data;
        }
    })
}
</script>
<style>
</style>