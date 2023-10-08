import { defineStore } from 'pinia'


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
    current_blog_post: null,
    blog_posts: [
        {
            id: uuidv4(),
            title: 'sample',
            content: '# content heading 1\nplain text'
        }
    ],
  }),
  actions: {
    get_post_by_id(id) {
        for (const b of this.blog_posts) {
            if (b.id == id) return b
        }
    },
    save_post(blog) {
        
        if (blog.id) {
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
