<template>
  <div class="thread-compose-view">
    <b-form @submit.prevent="onSubmit">
      <b-form-textarea
        v-model="body"
        :placeholder="placeholder"
      ></b-form-textarea>
      <b-button type="submit" variant="primary">
        submit
      </b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import authios from '@/concerns/authios';
import { toastError, toastSuccess } from '@/concerns/helpers';
import store from '@/store';
import { MessageDocument } from '@/types/MessageResource';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      placeholder: '',
      body: '',
    };
  },

  created(): void {
    this.placeholder = this.randomPlaceholder();
  },

  mounted(): void {
    this.$el.scrollIntoView({ block: 'center' });
  },

  methods: {
    toastError,
    toastSuccess,

    randomPlaceholder(): string {
      const placeholders = [
        "I hope this message finds you well...",
        "Though it has been months since we last spoke...",
        "The war is brutal, but...",
        "I hope these, my dying words, make it to...",
        "I cannot believe the audacity...",
        "I don't know the next time I'll be able to...",
        "I must warn you, this may be my last...",
        "Where have you been all my...",
        "I swear, if you...",
        "I can only hope I'm not too late to...",
        "If only I had received your...",
        "One day, soon, I will be able to...",
        "Your words are harsh, but I...",
      ];
      const placeholderIndex = Math.floor(Math.random() * placeholders.length);
      return placeholders[placeholderIndex];
    },

    onSubmit(): void {
      const { user, thread } = store.state;
      const sender = user;
      const receiver = thread.relationships.participants.data.find(({ id }) => id !== sender.id);
      if (!receiver) throw new Error('wat? no receiver?');

      authios.post<MessageDocument>('/messages', {
        message: {
          sender_id: sender.id,
          receiver_id: receiver.id,
          body: this.body,
        },
      }).then((response) => store.dispatch('addResourcesFromDocument', response.data))
        .then(() => store.dispatch('fetchThread', { id: thread.id, include: ['messages', 'participants'] }))
        .then(() => store.dispatch('setThread', store.state.resources.messageThread[thread.id]))
        .then(() => { this.body = ''; this.toastSuccess("Sent!") })
        .catch((reason) => { this.toastError(reason) });
    },
  },
});
</script>

<style lang="scss">
.thread-compose-view {
  // height: calc(100vh - 5rem);
}
</style>
