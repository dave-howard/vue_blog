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
  if (props.blog_id == undefined && blog.value.id == undefined) {
    blog.value = {
      id: 'new',
      title: 'new title',
      content: 'new item content',
      active: false,
      pinned: false,
      saved: false,
    }
    last_blog_id = null
    return
  }
  if (props.blog_id != last_blog_id) {
    const blog_data = useBlogStore().get_post_by_id(props.blog_id)
    //create a copy of blog item so it is not updated until saved
    if (blog_data) {
      blog.value = {
        id: blog_data.id,
        title: blog_data.title,
        content: blog_data.content,
        active: blog_data.active,
        pinned: blog_data.pinned,
        saved: false,
      }
      last_blog_id = blog_data.id
      return
    }
  }
  console.log(`last_blog_id=${last_blog_id}`)
}

onMounted(() => {
  //first load
  get_blog()
})

onBeforeUpdate(() => {
  // when props change
  get_blog()
})

function save_blog() {
  useBlogStore().save_post(blog.value)
}

function save_status() {
  // return Save, Saved, Saving
  if (blog.value.saving) return 'Saving...'
  if (blog.value.saved) return 'Saved <i class="bi-check"></i>'
  return 'Save'
}
</script>

<template v-if="blog.value">
  <div class="row">
    <h1>{{ !blog.id || blog.id.startsWith('blog') ? 'Edit' : 'Create new' }} post</h1>
  </div>
  <div class="row">
    <div class="col">
      <a class="mb-1" href="https://www.markdownguide.org/basic-syntax/" target="guide">Markdown Guide</a>
      <input class="form-control mb-1" disabled v-model="blog.id">
      <input class="form-control mb-1" v-model="blog.title" />
      <textarea class="form-control mb-1" v-model="blog.content" rows="8"></textarea>
      <div class="form-check">
        <label class="form-check-label" for="active_checkbox">Active</label>
        <input class="form-check-input" type="checkbox" v-model="blog.active" id="active_checkbox">
      </div>
      <div class="form-check">
        <label class="form-check-label" for="pinned_checkbox">Pinned</label>
        <input class="form-check-input" type="checkbox" v-model="blog.pinned" id="pinned_checkbox">
      </div>

      <button class="btn btn-sm btn-success" @click="save_blog" v-html="save_status()"></button>
    </div>
    <div class="col">
      <BlogItem v-if="blog.content || blog.title" :blog="blog" :edit_button_enabled="false"></BlogItem>
      <div v-else class="bg-light rounded border border-2 h-100 text-center">
        Enter some content...
      </div>
    </div>
  </div>
</template>
