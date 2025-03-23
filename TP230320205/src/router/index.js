import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PostDetailsView from '@/views/PostDetailsView.vue';

const routes = [
    {
        path: '/Home',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: '/detail/:id',
        name: 'PostDetailsView',
        component: PostDetailsView,
        props: true
      },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
