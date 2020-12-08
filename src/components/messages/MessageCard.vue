<template>
  <b-card class="message-card">
    {{ message.attributes.body }}
    <template v-slot:footer>
      <section class="text-right">
        <small class="text-muted">
          {{ message.attributes.senderUsername }}
        </small>
      </section>
    </template>
  </b-card>
</template>

<script lang="ts">
import MessageResource from '@/types/MessageResource';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    message: {
      type: Object as PropType<MessageResource>,
      required: true,
    },
  },
});
</script>
