<template>
  <b-navbar
    id="nav-bar"
    :class="['nav-bar', { shrink }]"
    sticky
    toggleable="md"
    type="dark"
    variant="info"
  >
    <!-- <b-navbar-brand>
      <a href="#" @click.prevent="showBackButton ? goBack() : goHome()">
        <b-icon-arrow-left v-if="showBackButton"/>
        {{ title }}
      </a>
    </b-navbar-brand> -->
    <b-navbar-brand :to="titleRoute">
      <b-icon-arrow-left v-if="showBackButton"/>
      {{ title }}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-model="navCollapseVisible" id="nav-collapse" is-nav>
      <b-navbar-nav :small="shrink" class="ml-auto">
        <b-nav-item :to="{ name: 'About' }" :active="$route.name === 'About'">
          about
        </b-nav-item>

        <template v-if="signedIn">
          <b-nav-item :to="{ name: 'ThreadIndex' }" :active="$route.name === 'ThreadIndex'">
            threads
          </b-nav-item>
          <b-nav-item :to="{ name: 'SettingsEdit' }" :active="$route.name === 'SettingsEdit'">
            settings
          </b-nav-item>
          <b-nav-item :to="{ name: 'Help' }" :active="$route.name === 'Help'">
            help
          </b-nav-item>
        </template>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            {{ theme }} mode
          </template>
          <b-dropdown-item :active="theme === 'dark'" @click.prevent="setTheme('dark')">
            dark
          </b-dropdown-item>
          <b-dropdown-item :active="theme === 'light'" @click.prevent="setTheme('light')">
            light
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <template v-if="signedIn">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item :to="{ name: 'ProfileShow', params: { username } }">
              profile
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="signOut">
              sign out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
        <template v-else>
          <b-nav-item v-if="!signedIn" :to="{ name: 'SignIn' }">
            sign in
          </b-nav-item>
        </template>

        <!-- <b-nav-form @submit.prevent="onSearch">
          <b-form-input
            v-model="searchString"
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
          >
            Search
          </b-button>
        </b-nav-form> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import Theme from '@/types/Theme';
import { threadTitleFor } from '@/concerns/threadUtils';
import { RawLocation } from 'vue-router';

export default Vue.extend({
  name: 'NavBar',

  props: {
    shrink: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchString: "",
      navCollapseVisible: false,
    };
  },

  computed: {
    username(): string {
      return store.state.user.attributes.username;
    },

    signedIn(): boolean {
      return store.getters.signedIn;
    },

    theme(): Theme {
      return store.state.theme;
    },

    defaultTitle(): string {
      return 'turtello';
    },

    title(): string {
      switch (this.$route.name) {
        case 'ThreadShow': return threadTitleFor(store.state.thread);
        case 'ThreadCompose': return 'New message';
        default: return this.defaultTitle;
      }
    },

    titleRoute(): RawLocation {
      switch (this.$route.name) {
        case 'ThreadShow': return { name: 'ThreadIndex' };
        case 'ThreadCompose': return { name: 'ThreadShow' };
        default: return '/';
      }
    },

    showBackButton(): boolean {
      return this.title !== this.defaultTitle;
    },
  },

  methods: {
    onSearch(_event: Event): void {
      // this.$emit('search', this.searchString);
      this.$emit('not-implemented');
    },

    setTheme(theme: Theme): void {
      store.dispatch('setTheme', { theme });
    },

    signOut(): Promise<void> {
      return store.dispatch('signOut').then(() => {
        if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' });
      });
    },

    // onBlurToggle(): void {
    //   if (this.navCollapseVisible) {
    //     this.$root.$emit('bv::toggle::collapse', 'nav-collapse'); // eslint-disable-line vue/custom-event-name-casing
    //   }
    // },
  },
});
</script>

<style lang="scss">
$navbar-padding-top: 0.5rem;
$navbar-padding-bottom: 0.5rem;

#nav-bar {
  padding-top: $navbar-padding-top;
  padding-bottom: $navbar-padding-bottom;
  padding-left: 1rem;
  padding-right: 0;
  // padding: $navbar-padding-top 0 $navbar-padding-bottom 1rem;
  margin-bottom: 0;
  transition:
    padding-top 0.2s,
    padding-bottom 0.2s,
    margin-bottom 0.2s;

  &.shrink {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: $navbar-padding-top + $navbar-padding-bottom;
    opacity: 0.9;
  }

  .navbar-nav {
    transition: font-size 0.2s;
  }

  .navbar-toggler {
    border-color: transparent;
  }
}
</style>
