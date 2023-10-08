<script setup>
import { onMounted, onBeforeUpdate, ref } from 'vue'
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'

const props = defineProps({
    blog_id : {
        type: String
    },
})

const blog = ref(null)

const get_blog = () => {
  // get blog post from database by id
  blog.value = useBlogStore().get_post_by_id(props.blog_id)
}

onMounted(() => {
  //first load
  get_blog()
})

onBeforeUpdate(() => {
  // when props change
  get_blog()
})

</script>

<template>
  <div class="row">
    <div class="col">   
      <BlogItem v-if="blog" :id="blog.id" :title="blog.title" :content="blog.content"></BlogItem>
      <div v-else class="alert alert-warning">Nope</div>
    </div>
  </div>
</template>
