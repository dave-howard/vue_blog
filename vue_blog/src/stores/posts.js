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
    session_id: null,
    current_blog_post: null,
    blog_posts: null,
  }),
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
            })
            .catch(console.log)
            .finally(() => {
                console.log('done')
            })
    },
    logout() {
        this.session_id = null
    },
    get_posts() {
        console.log('getting posts')
        const body = {}
        axios
            .post(lamdba_get_blog_url, body)
            .then(response => {
                console.log(response.data)
                this.blog_posts=response.data.posts
            })
            .catch(console.log)
            .finally(() => {
                console.log('done')
            })
    },
    get_post_by_id(id) {
        // load blog posts if there are none
        console.log(`get_post_by_id(${id})`)
        if (this.blog_posts==null) {
            const body = {}
            axios
            .post(lamdba_get_blog_url, body)
            .then(response => {
                console.log(response.data)
                this.blog_posts=response.data.posts
            })
            .catch(console.log)
            .finally(() => {
                console.log(`get_post_by_id(${id}) finally`)
                for (const b of this.blog_posts) {
                    if (b.id == id) {
                        this.current_blog_post = b
                        console.log(`get_post_by_id(${id}) returning`)
                        return b
                    }
                }
            })
            return
        }
        console.log('checking existing list for '+id)
        for (const b of this.blog_posts) {
            if (b.id == id) {
                this.current_blog_post = b
                return b
            }
        }
    },
    save_post(blog) {
        
        if (blog.id != 'new') {
            // update existing
            const existing_post = this.get_post_by_id(blog.id)
            existing_post.title = blog.title
            existing_post.content = blog.content
        } else {
            // set an id and add to list
            blog.id = uuidv4()
            this.blog_posts.push(blog)
        }
    }
  }
})
