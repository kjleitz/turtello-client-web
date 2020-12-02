import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import initBootstrap from '@/init/initBootstrap';

initBootstrap();

Vue.config.productionTip = false;

store.dispatch('checkAuth').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
