<script setup>
import { RouterLink } from 'vue-router'
import { useBlogStore } from '../stores/posts';

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
    <template  v-for="blog in useBlogStore().posts_sorted_by_modified" :key="blog.id">
      <RouterLink class="m-1" :to="`/blog/${blog.id}`">
        <span v-html="blog.title"></span>
        <i v-if="useBlogStore().session_id" :class="{'bi-check':blog.active, 'bi-x':!blog.active}"></i>
        <i v-if="useBlogStore().session_id" :class="{'bi-pin-angle-fill':blog.pinned, 'bi-pin-angle':!blog.pinned}"></i>
      </RouterLink>
      <br>
    </template>
  </div>
</template>