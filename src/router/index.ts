import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

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
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "sign_in" */ '@/views/SignIn.vue'),
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "help" */ '@/views/Help.vue'),
  },
  {
    path: '/threads',
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
  {
    path: '/profiles',
    component: () => import(/* webpackChunkName: "profiles" */ '@/views/Profiles.vue'),
    children: [
      {
        path: '/',
        name: 'ProfileEdit',
        component: () => import(/* webpackChunkName: "profile_edit" */ '@/views/profiles/ProfileEdit.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/:username',
        name: 'ProfileShow',
        component: () => import(/* webpackChunkName: "profile_show" */ '@/views/profiles/ProfileShow.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    children: [
      {
        path: '/',
        name: 'SettingsEdit',
        component: () => import(/* webpackChunkName: "settings_edit" */ '@/views/settings/SettingsEdit.vue'),
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

router.beforeEach((to, _from, next) => {
  const routeRequiresLogin = to.matched.some(({ meta }) => meta.requiresAuth);

  // const fetchUserIfNotFetched = (): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     if (store.state.userFetched) {
  //       resolve();
  //     } else {
  //       store.dispatch('fetchCurrentUser').then(resolve).catch(reject);
  //     }
  //   });
  // };

  // fetchUserIfNotFetched().then(() => {
  //   if (routeRequiresLogin && !store.getters.signedIn) {
  //     next({ name: 'SignIn', params: { nextUrl: to.fullPath } });
  //   } else {
  //     next();
  //   }
  // });

  if (routeRequiresLogin && !store.getters.signedIn) {
    next({ name: 'SignIn', params: { nextUrl: to.fullPath } });
  } else {
    next();
  }
});

export default router;
