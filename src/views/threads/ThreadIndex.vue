<template>
  <div class="thread-index-view">
    thread message counts:
    <div v-for="thread in threads" :key="thread.id" class="thread">
      {{ thread.relationships.messages.data.length }}
    </div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
    <div class="foobar">hi</div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import ThreadResource from '@/types/ThreadResource';
import Vue from 'vue';

export default Vue.extend({
  computed: {
    threads(): ThreadResource[] {
      return store.getters.threads;
    },
  },

  beforeRouteUpdate(_to, _from, next): void {
    this.fetchThreads().then(() => { next() });
  },

  created(): void {
    this.fetchThreads();
  },

  methods: {
    fetchThreads(): Promise<void> {
      const userId = store.state.user.id;
      return store.dispatch('fetchThreads', { userId });
    },
  },
});
</script>
