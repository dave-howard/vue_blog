<script setup>
import { useBlogStore } from '../stores/posts.js'
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

function display_date(d) {
  const iso_date = new Date(d)
    return iso_date.toLocaleDateString()
}
</script>

<template>
  <div class="bg-light border border-2 rounded p-2 mb-3">
    <div class="bg-light rounded p-1 d-flex position-relative">
      <span class="display-5" v-html="blog.title"></span>
      <div class="position-absolute top-0 end-0">
        <small>{{ display_date(blog.modified) }}</small>
      </div>
      <RouterLink v-if="edit_button_enabled && blog.id && useBlogStore().session_id" :to="`/edit/${blog.id}`"
        class="position-absolute bottom-0 end-0 btn btn-sm btn-success">
        <i class="bi bi-pen"></i>
      </RouterLink>
    </div>
    <hr class="border border-3 border-dark">
    <vue-markdown :source="blog.content"></vue-markdown>
    <template v-if="useBlogStore().session_id">
      <hr>
      <span class="rounded border border-2 m-1 p-1">id:{{ blog.id }}</span>
    </template>
    
  </div>
</template>