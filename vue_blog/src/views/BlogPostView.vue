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
const blogs = useBlogStore()

const get_blog = () => {
  // get blog post from database by id
  blog.value = useBlogStore().get_post_by_id(props.blog_id)
  console.log(`blog.value for '${props.blog_id}'=${blog.value}`)
}

onMounted(() => {
  //first load
  console.log('onMounted')
  get_blog()
})

onBeforeUpdate(() => {
  // when props change
  console.log('onBeforeUpdate')
  if (!blog.value || blog.value.id!=props.blog_id) get_blog()
})

</script>

<template>
  <div class="bg-info d-none">
    {{ blogs.current_blog_post }}
  </div>
  <div class="row">
    <div class="col">   
      <BlogItem v-if="blog" :blog="blogs.current_blog_post"></BlogItem>
      <div v-else class="alert alert-warning">Content loading...</div>
    </div>
  </div>
</template>
