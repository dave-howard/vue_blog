<script setup>
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
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ content }}</p>
  </div>
</template>