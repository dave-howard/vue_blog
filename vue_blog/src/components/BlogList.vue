<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  blogs: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-light border border-2 rounded p-2">
    <h5>Blogs...</h5>
    <hr>
    <template  v-for="blog in blogs" :key="blog.id">
      <RouterLink class="m-1" :to="`/blog/${blog.id}`">{{blog.title}}</RouterLink>
      <br>
    </template>
  </div>
</template>