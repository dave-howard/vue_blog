<script setup>
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'
import { ref, onMounted, onBeforeUpdate } from 'vue'

const props = defineProps({
    blog_id : {
        type: String
    },
})

const blog = ref({})

// track last blog id so we can update content when it changes
let last_blog_id = null

const get_blog = () =>{
  if (!props.blog_id && blog.value.id != null) {
    blog.value = {
      id: null,
      title: 'new title',
      content: 'new item content',
    }
    last_blog_id = null
    //console.log(blog)
    return
  }
  if (props.blog_id != last_blog_id) {
    const blog_data = useBlogStore().get_post_by_id(props.blog_id)
    //create a copy of blog item so it is not updated until saved
    if (blog_data) {
      blog.value = {
        id: blog_data.id,
        title: blog_data.title,
        content: blog_data.content
      }
      last_blog_id = blog_data.id
      return
    }
  }
  console.log(`last_blog_id=${last_blog_id}`)
}

onMounted(() => {
  //first load
  console.log('mounted')
  get_blog()
})

onBeforeUpdate(() => {
  // when props change
  console.log('before update')
  get_blog()
})

//const blog_title = ref('my title')
//const blog_content = ref('### heading 2\n\n- item one\n- item two\n')

function save_blog() {
  useBlogStore().save_post(blog.value)
}
</script>

<template>
  <div class="row">
    <h1>Create new post</h1>
  </div>
  <div class="row">
    <div class="col">
      <input class="form-control" disabled v-model="blog.id">
      <input class="form-control" v-model="blog.title" />
      <textarea class="form-control" v-model="blog.content" rows="8"></textarea>
      <button class="btn btn-sm btn-success" @click="save_blog">Save (TODO)</button>
    </div>
    <div class="col">
      <BlogItem v-if="blog.content || blog.title" :blog="blog" :edit_button_enabled="false"></BlogItem>
      <div v-else class="bg-light rounded border border-2 h-100 text-center">
        Enter some content...
      </div>
    </div>
  </div>
</template>
