<script setup>
import { ref } from 'vue'
import { useBlogStore } from '../stores/posts.js'
import LoginForm from '../components/LoginForm.vue'
import BlogItem from '../components/BlogItem.vue'

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
  <template v-for="post in useBlogStore().pinned_posts" :key="post.id">
    <div class="row mb-2">
      <div class="col">
        <BlogItem :blog="post"></BlogItem>
      </div>
    </div>
  </template>
</template>
