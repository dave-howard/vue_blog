<script setup>
import { useBlogStore } from '../stores/posts.js'
import BlogItem from '../components/BlogItem.vue'

if (!useBlogStore().blog_posts) useBlogStore().get_posts()
</script>

<template>
  <div class="row">
    <h1 class="text-center">Welcome to the CodyPy blog!</h1>
  </div>
  <template v-for="post in useBlogStore().pinned_posts" :key="post.id">
    <div class="row mb-2">
      <div class="col">
        <BlogItem :blog="post"></BlogItem>
      </div>
    </div>
  </template>
</template>
