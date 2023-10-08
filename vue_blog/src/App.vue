<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useBlogStore } from './stores/posts.js'
import BlogList from './components/BlogList.vue';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-top navbar-border-bottom bg-primary sticky-top">
    <div class="container">
      <span class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
      </span>
      <ul class="nav navbar-nav text-white">
        <li class="nav-item">
          <RouterLink class="nav-link m-1 text-white" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link m-1 text-white" to="/new">New</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link m-1 text-white" to="/blog">Blog</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link m-1 text-light" href="https://www.markdownguide.org/basic-syntax/" target="guide">Markdown Guide</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid mt-1">
    <div class="row">
      <div class="col-lg-10">
        <RouterView />
      </div>
      <div class="col-lg-2">
        <BlogList :blogs="useBlogStore().blog_posts" ></BlogList>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");

h1 {
  color: var(--bs-primary)
}

h2 {
  color: var(--bs-indigo)
}
</style>