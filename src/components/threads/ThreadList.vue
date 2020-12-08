<template>
  <div class="thread-list">
    <ThreadListItem
      v-for="thread in threads"
      :key="thread.id"
      :thread="thread"
      class="thread-list-item"
      @click="onThreadSelected(thread.id)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ThreadListItem from '@/components/threads/ThreadListItem.vue';
import ThreadResource from '@/types/ThreadResource';

export default Vue.extend({
  components: {
    ThreadListItem,
  },

  props: {
    threads: {
      type: Array as PropType<ThreadResource[]>,
      required: true,
    },
  },

  methods: {
    onThreadSelected(id: string): void {
      this.$router.push({ name: 'ThreadShow', params: { id } });
    },
  },
});
</script>

<style lang="scss">
.thread-list {
  .thread-list-item {
    width: 100%;
  }
}
</style>
