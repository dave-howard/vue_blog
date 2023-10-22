<script setup>
import { useBlogStore } from '../stores/posts.js'

useBlogStore().get_posts()
</script>

<template>
  <div class="row">
    <h1>Home page</h1>
  </div>
  <div class="row">
    <div class="col">
      home content...
    </div>
  </div>
</template>
