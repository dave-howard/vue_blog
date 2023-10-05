import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blogStore', {
  state: ()=>({
    version: '0.0.1',
    blog_posts: [],
  }),
  actions: {
    add_post(title, content) {
        const post = {
            title: title,
            content: content,
        }
        this.blog_posts.push(post)
    }
  }
})
