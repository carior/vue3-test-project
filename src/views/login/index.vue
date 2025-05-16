<template>
  <div class="about">
    login
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