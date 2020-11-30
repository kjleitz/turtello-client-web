import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/threads',
    name: 'Threads',
    component: () => import(/* webpackChunkName: "threads" */ '@/views/Threads.vue'),
    children: [
      {
        path: '/',
        name: 'ThreadIndex',
        component: () => import(/* webpackChunkName: "thread_index" */ '@/views/threads/ThreadIndex.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/:id',
        name: 'ThreadShow',
        component: () => import(/* webpackChunkName: "thread_show" */ '@/views/threads/ThreadShow.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
