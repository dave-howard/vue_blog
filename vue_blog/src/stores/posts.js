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
    add_post(title, content) {
        const post = {
            id: uuidv4(),
            title: title,
            content: content,
        }
        this.blog_posts.push(post)
    }
  }
})
