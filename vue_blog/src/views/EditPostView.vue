<script setup>
import BlogItem from '../components/BlogItem.vue'
import { useBlogStore } from '../stores/posts.js'
import { ref, onMounted, onBeforeUpdate, onUpdated, watch } from 'vue'

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
    if (blog_data) copy_blog_data(blog_data)
  }
}

onMounted(() => {
  //first load
  get_blog()
  // setup auto resize for textarea
  const textarea = document.querySelector('textarea')
  if (textarea) {
    // eslint-disable-next-line no-undef
    autosize(textarea)
    textarea.style.height = textarea.scrollHeight - 4 + 'px';
    textarea.focus()
  }
})

onBeforeUpdate(() => {
  // when props change
  get_blog()
})

onUpdated(() => {
  // setup auto resize for textarea
  const textarea = document.querySelector('textarea')
  // eslint-disable-next-line no-undef
  autosize(textarea)
  textarea.style.height = textarea.scrollHeight - 4 + 'px';
})

watch(
  ()=>useBlogStore().current_blog_post,
  (blog_data) => {
    // update blog data when current blog item updated (if loaded as a result of page refresh)
    copy_blog_data(blog_data)
})

function copy_blog_data(blog_data) {
  //create a copy of blog item so store copy is not updated until saved
  blog.value = {
    id: blog_data.id,
    title: blog_data.title,
    content: blog_data.content,
    active: blog_data.active,
    pinned: blog_data.pinned,
    created: blog_data.created,
    modified: blog_data.modified,
    saved: false,
  }
  last_blog_id = blog_data.id
}

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

<template v-if="blog.id">
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
