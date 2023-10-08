<script setup>
import VueMarkdown from 'vue-markdown-render'
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-light border border-2 rounded p-2">
    <h1>{{ title }}</h1>
    <hr>
    <vue-markdown :source="content"></vue-markdown>
  </div>
</template>