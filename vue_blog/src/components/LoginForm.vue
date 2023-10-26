<script setup>
import {ref} from 'vue'
import { useBlogStore } from '../stores/posts.js'
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="bg-light border border-2 rounded p-2 login-form">
    <template v-if="!useBlogStore().session_id" >
      <div class="form-floating mb-3">
        <input v-model="username" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button class="btn btn-success" @click="useBlogStore().login(username, password)">Login</button>
    </template>
    <button v-if="useBlogStore().session_id" class="btn btn-danger" @click="useBlogStore().logout()">Logout</button>
    <div class="position-absolute top-0 end-0">
      <button type="button" class="btn btn-sm btn-danger m-1" @click="useBlogStore().view_status.show_login=false">&times;</button>
    </div>
  </div>
</template>

<style scoped>
div.login-form {
  max-width: 400px;
}
</style>