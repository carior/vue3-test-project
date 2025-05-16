<template>
  <div class="about">
      <el-button type="primary">我是管理员主页</el-button>
      <el-button type="primary" @click="totiao('pc')">PC</el-button>
      <el-button type="primary" @click="totiao('admin')">admin</el-button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const totiao = (path) => {
  router.push(path)
}
</script>
<style>
</style>