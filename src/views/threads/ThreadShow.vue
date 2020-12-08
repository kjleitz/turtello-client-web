<template>
  <article class="thread-show-view">
    <MessageCard
      v-for="message in messages"
      :key="message.id"
      :message="message"
      class="m-2"
    />
  </article>
</template>

<script lang="ts">
import { threadMessagesFor } from '@/concerns/threadUtils';
import store from '@/store';
import MessageResource from '@/types/MessageResource';
import ThreadResource from '@/types/ThreadResource';
import Vue from 'vue';
import MessageCard from '@/components/messages/MessageCard.vue';

export default Vue.extend({
  components: {
    MessageCard,
  },

  beforeRouteUpdate(to, _from, next): void {
    this.initThread(to.params.id).then(() => next());
  },

  created(): void {
    this.initThread(this.$route.params.id);
  },

  computed: {
    thread(): ThreadResource {
      return store.state.thread;
    },

    messages(): MessageResource[] {
      return threadMessagesFor(this.thread);
    },
  },

  methods: {
    initThread(id: string): Promise<void> {
      this.setThreadById(id);
      return store.dispatch('fetchThread', { id, include: ['messages'] }).then(() => {
        this.setThreadById(id);
      });
    },

    setThreadById(id: string): void {
      const thread = store.state.resources.messageThread[id];
      if (thread) store.commit('setThread', thread);
    },
  },
});
</script>
