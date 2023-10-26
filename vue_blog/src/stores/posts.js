import { defineStore } from 'pinia'
import axios from 'axios'

const lamdba_get_blog_url = 'https://aaaq3sbldjqiyxv3ir6sl6bitu0oglta.lambda-url.eu-west-1.on.aws/'

function uuidv4() { 
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
	.replace(/[xy]/g, function (c) { 
		const r = Math.random() * 16 | 0, 
			v = c == 'x' ? r : (r & 0x3 | 0x8); 
		return v.toString(16); 
	}); 
}


export const useBlogStore = defineStore('blogStore', {
  state: ()=>({
    version: '0.0.1',
    view_status: {
        show_login: false,
    },
    session_id: null,
    current_blog_post: null,
    blog_posts: null,
  }),
  getters: {
    pinned_posts() {
        // return all pinned posts
        if (!this.blog_posts) return []
        const posts = this.blog_posts.filter(p => (p.pinned))
        posts.sort((a, b)=> {
            if (a.modified && b.modified)
                return a.modified < b.modified ? 1 : -1
            return 0
        })
        return posts
    },
  },
  actions: {
    login(username, password) {
        console.log('login')
        const body = {
            username,
            password,
        }
        axios
            .post(lamdba_get_blog_url, body)
            .then(response => {
                console.log(response.data)
                this.session_id = response.data.session_id
                this.get_posts()
            })
            .catch(console.log)
            .finally(() => {
                console.log('done')
            })
    },
    logout() {
        this.session_id = null
        this.get_posts()
    },
    get_posts() {
        console.log('getting posts')
        if (!this.blog_posts) this.blog_posts = []
        const body = {
            session_id: this.session_id,
        }
        axios
            .post(lamdba_get_blog_url, body)
            .then(response => {
                console.log(response.data)
                for (const post of response.data.posts) {
                    const match = this.blog_posts.filter(p => p.id==post.id)
                    if (!match)
                        this.blog_posts.push(post)  
                }

                this.blog_posts=response.data.posts
            })
            .catch(console.log)
            .finally(() => {
                console.log('done')
            })
    },
    get_post_by_id(id) {
        // load blog posts if there are none
        if (!this.blog_posts) this.blog_posts = []
        for (const b of this.blog_posts) {
            if (b.id == id && b.content) {
                this.current_blog_post = b
                console.log('Return from existing list')
                return b
            }
        }
        const body = {
            blog_id: id
        }
        axios
            .post(lamdba_get_blog_url, body)
            .then(response => {
                this.current_blog_post = response.data.post
            })
            .finally(() => {
                if (!this.blog_posts) this.blog_posts = []
                for (const b of this.blog_posts) {
                    if (b.id == id) {
                        b.content = this.current_blog_post.content
                        this.current_blog_post = b
                        console.log('Updating existing list and returning')
                        console.log(b)
                        return b
                    }
                }
                this.blog_posts.push(this.current_blog_post)
                console.log('Added to existing list and returning')
                return this.current_blog_post
            })
    },
    save_post(blog) {
        blog.saving = true
        if (blog.id == 'new') {
            // set a new id and add to list
            blog.id = uuidv4()
            this.blog_posts.push(blog)
        } else {
            // update existing
            const existing_post = this.get_post_by_id(blog.id)
            existing_post.title = blog.title
            existing_post.content = blog.content
            existing_post.active = blog.active
            existing_post.pinned = blog.pinned
        }
        // save post (add/create)
        const body = {
            session_id: this.session_id,
            blog
        }
        axios
            .post(lamdba_get_blog_url, body)
            .then(()=> {
                blog.saving=false
                blog.saved=true
            })
            .catch(console.log)
    }
  }
})
