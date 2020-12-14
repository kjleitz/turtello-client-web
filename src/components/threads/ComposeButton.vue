<template>
  <b-button
    v-bind="$attrs"
    variant="primary"
    pill
    v-on="$listeners"
  >
    <slot>Compose</slot>
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
