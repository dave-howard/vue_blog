<script setup>
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'
import { ref } from 'vue'

const blog_title = ref('my title')
const blog_content = ref('### heading 2\n\n- item one\n- item two\n')

function add_blog() {
  useBlogStore().add_post(blog_title.value, blog_content.value)
}
</script>

<template>
  <div class="row">
    <h1>Create new post</h1>
  </div>
  <div class="row">
    <div class="col">
      <input class="form-control" v-model="blog_title" />
      <textarea class="form-control" v-model="blog_content" rows="8"></textarea>
      <button class="btn btn-sm btn-success" @click="add_blog">Save (TODO)</button>
    </div>
    <div class="col">   
      <BlogItem :title="blog_title" :content="blog_content"></BlogItem>
    </div>
  </div>
</template>
