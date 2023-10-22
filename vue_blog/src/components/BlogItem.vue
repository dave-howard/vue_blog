<script setup>
import VueMarkdown from 'vue-markdown-render'
import { RouterLink } from 'vue-router'

defineProps({
  blog: {
    type: Object,
    required: true
  },
  edit_button_enabled: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<template>
  <div class="bg-light border border-2 rounded p-2">
    <h1>{{ blog.title }}</h1>
    <hr>
    <vue-markdown :source="blog.content"></vue-markdown>
    <template v-if="edit_button_enabled">
      <hr>
      <RouterLink v-if="blog.id" class="btn btn-sm btn-success" :to="`/edit/${blog.id}`">Edit</RouterLink>
      <span class="rounded border border-2 m-1 p-1">id:{{ blog.id }}</span>
    </template>
  </div>
</template>