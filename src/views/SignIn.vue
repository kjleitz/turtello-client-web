<template>
  <div class="sign-in-view">
    <h2>sign in</h2>
    <b-form :disabled="submitting" @submit.prevent="signIn">
      <b-form-input
        v-model="username"
        :disabled="submitting"
        autocomplete="username"
        placeholder="username"
        class="mb-2"
        required
        autofocus
        @keydown.enter.exact.prevent="$refs.signInPassword.focus()"
      ></b-form-input>
      <b-form-input
        ref="signInPassword"
        v-model="password"
        :disabled="submitting"
        type="password"
        autocomplete="current-password"
        placeholder="password"
        class="mb-2"
        required
        @keydown.enter.exact.prevent="signIn"
      ></b-form-input>
      <b-button
        :disabled="submitting"
        variant="success"
        @click.prevent="signIn"
        class="mb-2"
      >
        <b-icon-arrow-clockwise v-if="submittingSignIn" animation="spin"/>
        <b-icon-check v-else/>
        sign in
      </b-button>
    </b-form>
    <hr/>
    <h2>sign up</h2>
    <b-form @submit.prevent="signUp">
      <b-form-input
        v-model="username"
        :disabled="submitting"
        autocomplete="username"
        placeholder="username"
        class="mb-2"
        required
        @keydown.enter.exact.prevent="$refs.signUpPassword.focus()"
      ></b-form-input>
      <b-form-input
        ref="signUpPassword"
        v-model="password"
        :disabled="submitting"
        type="password"
        autocomplete="new-password"
        placeholder="password"
        required
        class="mb-2"
        @keydown.enter.exact.prevent="$refs.signUpName.focus()"
      ></b-form-input>
      <!-- <b-form-input
        ref="signUpName"
        v-model="name"
        :disabled="submitting"
        placeholder="name (optional)"
        class="mb-2"
        @keydown.enter.exact.prevent="$refs.signUpEmail.focus()"
      ></b-form-input>
      <b-form-input
        ref="signUpEmail"
        v-model="email"
        :disabled="submitting"
        type="email"
        placeholder="email (optional)"
        class="mb-2"
        @keydown.enter.exact.prevent="$refs.signUpHigh.focus()"
      ></b-form-input> -->
      <b-button
        :disabled="submitting"
        variant="success"
        class="mb-2"
        @click.prevent="signUp"
      >
        <b-icon-arrow-clockwise v-if="submittingSignUp" animation="spin"/>
        <b-icon-check v-else/>
        sign up
      </b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { toastSuccess, toastError } from '@/concerns/helpers';

export default Vue.extend({
  name: 'SignIn',

  data() {
    return {
      submittingSignIn: false,
      submittingSignUp: false,
      username: "",
      password: "",
    };
  },

  computed: {
    submitting(): boolean {
      return this.submittingSignIn || this.submittingSignUp;
    },
  },

  methods: {
    toastSuccess,
    toastError,

    signIn(): void {
      const { username, password } = this;
      this.submittingSignIn = true;
      store.dispatch('signIn', {
        username,
        password,
      }).then(() => {
        const { nextUrl } = this.$route.params;
        this.$router.push(nextUrl || { name: 'ThreadIndex' });
        this.toastSuccess("Signed in!");
      }).catch((reason) => {
        this.toastError(reason);
      }).finally(() => {
        this.submittingSignIn = false;
      });
    },

    signUp(): void {
      const { username, password } = this;
      this.submittingSignUp = true;
      store.dispatch('signUp', {
        username,
        password,
      }).then(() => {
        const { nextUrl } = this.$route.params;
        this.$router.push(nextUrl || { name: 'ThreadIndex' });
        this.toastSuccess("Signed up and signed in!");
      }).catch((reason) => {
        this.toastError(reason);
      }).finally(() => {
        this.submittingSignUp = false;
      });
    },
  },
});
</script>
