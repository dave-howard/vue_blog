<script setup>
import { ref } from 'vue'
import { useBlogStore } from '../stores/posts.js'
import LoginForm from '../components/LoginForm.vue'

const show_login = ref(false)

if (!useBlogStore().blog_posts) useBlogStore().get_posts()
</script>

<template>
  <div class="row">
    <h1>Welcome</h1>
  </div>
  <div class="row">
    <div class="col">
      <button v-if="!show_login" class="btn btn-success" @click="show_login=true">Login</button>
      <button v-if="show_login" class="btn btn-danger mb-3" @click="show_login=false">Hide login</button>
      <LoginForm v-if="show_login"></LoginForm>
    </div>
  </div>
</template>
