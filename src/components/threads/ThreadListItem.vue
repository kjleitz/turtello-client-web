<template>
  <article class="thread-list-item border-bottom" @click="$emit('click', $event)">
    <header class="thread-header px-2 pt-2">
      <span class="thread-title" @click="$emit('title-clicked', $event)">
        {{ participantUsernames }}
      </span>
      <b-badge variant="primary" class="message-count">
        {{ messageCount }}
      </b-badge>
    </header>
    <article class="thread-preview p-2" @click="$emit('preview-clicked', $event)">
      {{ latestMessageBody }}
    </article>
  </article>
</template>

<script lang="ts">
import store from '@/store';
import ThreadResource from '@/types/ThreadResource';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    thread: {
      type: Object as PropType<ThreadResource>,
      required: true,
    },
  },

  // created(): void {
  //   store.dispatch('reifyResource', {
  //     resource: this.thread,
  //     useCached: true,
  //   });
  // },

  computed: {
    participantUsernames(): string {
      const { participantUsernames } = this.thread.attributes;
      const { username } = store.state.user.attributes;
      const otherParticipants = participantUsernames.filter(pu => pu !== username);
      return otherParticipants.join(', ');
    },

    latestMessageBody(): string {
      // const { participantUsernames } = this.thread.attributes;
      // const { username } = store.state.user.attributes;
      // const otherParticipants = participantUsernames.filter(pu => pu !== username);
      // return otherParticipants.join(', ');
      return this.thread.attributes.latestMessageBody;
    },

    messageCount(): number {
      return this.thread.relationships.messages.data.length;
    },
  },
});
</script>

<style lang="scss">
.thread-list-item {
  width: 100%;
  cursor: pointer;

  .thread-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .thread-title {
      flex-grow: 1;
      font-weight: 600;
    }
  }

  .thread-preview {
    font-size: 0.8rem;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
