<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useBlogStore } from './stores/posts.js'
import BlogList from '../src/components/BlogList.vue'
import LoginForm from '../src/components/LoginForm.vue'

const show_login = ref(false)
onMounted(() => {
  useBlogStore().get_posts()
})
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-top navbar-border-bottom bg-primary sticky-top">
    <div class="container">
      <span class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/codypylogo.png" height="60" />
      </span>
      <ul class="nav navbar-nav text-white">
        <li class="nav-item">
          <RouterLink class="nav-link m-1 text-white" to="/">Home</RouterLink>
        </li>
        <li v-if="useBlogStore().session_id" class="nav-item">
          <RouterLink class="nav-link m-1 text-white" to="/new">New</RouterLink>
        </li>
        <li class="nav-item">
          <i class="nav-link m-1 text-white" @click="show_login=!show_login"
          :class="{'bi-person-fill':useBlogStore().session_id, 'bi-person':!useBlogStore().session_id}"></i>
        </li>
      </ul>
    </div>
  </nav>
  <div v-if="show_login" class="text-dark" style="position: relative;top: -30px;left: auto;right: 10px;height: 0px;z-index: 2000;width: 200px;float: right;">
    <LoginForm></LoginForm>
  </div>
  <div class="container-fluid mt-1">
    <div class="row">
      <div class="col-sm-10 mb-1">
        <RouterView />
      </div>
      <div class="col-sm-2 mb-1">
        <BlogList :blogs="useBlogStore().blog_posts || []" ></BlogList>
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