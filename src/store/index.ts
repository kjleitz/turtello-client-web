import Thread from '@/models/Thread';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    threads: {} as Thread[],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
