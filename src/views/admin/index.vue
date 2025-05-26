<template>
  <div class="about">
      <a-button type="primary">我是管理员主页</a-button>
      <a-button type="primary" @click="totiao('pc')">PC</a-button>
      <a-button type="primary" @click="totiao('admin')">admin</a-button>
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