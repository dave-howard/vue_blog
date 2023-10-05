<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
          <RouterLink class="m-1" to="/about">About</RouterLink>
          <a class="m-1" href="https://www.markdownguide.org/basic-syntax/">Markdown Guide</a>
        </nav>
      </div>
    </header>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>