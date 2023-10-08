<script setup>
import { onMounted, onBeforeUpdate, ref } from 'vue'
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'

const props = defineProps({
    blog_id : {
        type: String
    },
})

let blog = ref(null)

onMounted(() => {
  //first load
  blog.value = useBlogStore().get_post_by_id(props.blog_id)
})

onBeforeUpdate(() => {
  // when props change
  blog.value = useBlogStore().get_post_by_id(props.blog_id)
})

</script>

<template>
  <div class="row">
    <div class="col">   
      <BlogItem v-if="blog" :title="blog.title" :content="blog.content"></BlogItem>
      <div v-else class="alert alert-warning">Nope</div>
    </div>
  </div>
</template>
