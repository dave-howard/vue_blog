<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useBlogStore } from './stores/posts.js'

function select_blog(id) {
  const blog = useBlogStore().get_post_by_id(id)
  useBlogStore().current_blog_post = blog
}
</script>

<template>
  <div class="container-fluid">
    <header class="row">
      <div class="col">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </div>
      <div class="col">
        <nav>
          <RouterLink class="m-1" to="/">Home</RouterLink>
          <RouterLink class="m-1" to="/new">New</RouterLink>
          <RouterLink class="m-1" to="/blog">Blog</RouterLink>
          <a class="m-1" href="https://www.markdownguide.org/basic-syntax/" target="guide">Markdown Guide</a>
        </nav>
      </div>
    </header>
    <div v-for="blog in useBlogStore().blog_posts" :key="blog.id" class="row">
      <div class="col">Title:{{ blog.title }} <button class="btn btn-sm btn-success mb-1" @click="select_blog(blog.id)">Go</button></div>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>