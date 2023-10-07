<script setup>
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'
</script>

<template>
  <div class="row">
    <div class="col">   
      <BlogItem v-if="useBlogStore().current_blog_post" :title="useBlogStore().current_blog_post.title" :content="useBlogStore().current_blog_post.content"></BlogItem>
    </div>
  </div>
</template>
