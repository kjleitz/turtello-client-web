<template>
  <div class="thread-index-view">
    <ThreadList
      :threads="threads"
      class="thread-list"
    />
  </div>
</template>

<script lang="ts">
import store from '@/store';
import ThreadResource from '@/types/ThreadResource';
import Vue from 'vue';
import ThreadList from '@/components/threads/ThreadList.vue';

export default Vue.extend({
  components: {
    ThreadList,
  },

  computed: {
    threads(): ThreadResource[] {
      return store.getters.threads;
    },
  },

  beforeRouteUpdate(_to, _from, next): void {
    store.dispatch('fetchThreads').then(() => { next() });
  },

  created(): void {
    store.dispatch('fetchThreads');
  },
});
</script>

<style lang="scss">
.thread-index-view {
  .thread-list {
    width: 100%;
  }
}
</style>
