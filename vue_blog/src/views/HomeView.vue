<script setup>
import BlogItem from '../components/BlogItem.vue'
import { ref } from 'vue'

const blog_title = ref('my title')
const blog_content = ref('### heading 2\n\n- item one\n- item two\n')
</script>

<template>
  <div class="row">
    <h1>Home page</h1>
  </div>
  <div class="row">
    <div class="col">
      <input class="form-control" v-model="blog_title" />
      <textarea class="form-control" v-model="blog_content" rows="8"></textarea>
      <button class="btn btn-sm btn-success">Save (TODO)</button>
    </div>
    <div class="col">   
      <BlogItem :title="blog_title" :content="blog_content"></BlogItem>
    </div>
  </div>
</template>
