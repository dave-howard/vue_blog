import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditPostView from '../views/EditPostView.vue'
import BlogPostView from '../views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new',
      component: EditPostView
    },
    {
      path: '/edit/:blog_id',
      name: 'edit',
      component: EditPostView,
      props: true
    },
    {
      path: '/blog/:blog_id',
      name: 'blog',
      component: BlogPostView,
      props: true
    }
  ]
})

export default router
