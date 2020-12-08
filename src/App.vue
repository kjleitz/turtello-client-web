<template>
  <div id="app">
    <NavBar
      v-if="!$route.meta.hideNavBar"
      :shrink="scrolled"
      @not-implemented="showApologyModal"
    />

    <b-container fluid id="main-container">
      <b-row no-gutters>
        <b-col>
          <router-view @not-implemented="showApologyModal"/>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="apology-modal">
      <template v-slot:modal-title>
        #sorrynotsorry
      </template>
      <b-img
        :src="require('@/assets/under_construction.gif')"
        alt="comin' soon!"
        fluid
      />
    </b-modal>
  </div>
</template>

<script lang="ts">
import _ from 'underscore';
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    NavBar,
  },

  data() {
    return {
      scrolled: false,
    };
  },

  mounted(): void {
    const syncScrolled = _.throttle(() => {
      this.scrolled = window.scrollY > 100;
    }, 300);

    syncScrolled();
    window.addEventListener('scroll', syncScrolled);
  },

  methods: {
    showApologyModal(): void {
      // this.$bvModal.msgBoxOk(
      //   "shit, sorry, I haven't implemented that, it's coming soon",
      //   {
      //     title: "ah, fuck, sorry",
      //     okTitle: "damn it, okay, shit I guess that's fine",
      //     headerClass: 'border-bottom-0',
      //     footerClass: 'border-top-0',
      //   },
      // );
      this.$bvModal.show('apology-modal');
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

body, body * {
  box-sizing: border-box;
}

html body {
  background-color: $light;
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: $dark;
}

// is this necessary? I don't think it is
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

#main-container {
  padding-left: 0;
  padding-right: 0;
}

.rendered-markdown {
  font-size: 14px;
  h1 { font-size: 1.2rem; }
  h2 { font-size: 1.1rem; font-weight: bold; }
  h3 { font-size: 1.1rem; }
  h4 { font-size: 1.1rem; font-style: italic; }
  h5 { font-size: 1rem; }
  h6 { font-size: 1rem; }
  img { max-width: 100% }

  > *:last-child {
    margin-bottom: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.cursor-pointer {
  cursor: pointer;
  label, input {
    cursor: pointer;
  }
}

.rotate-90 {
  transform: rotate(90deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

.rotate-270 {
  transform: rotate(270deg);
}

// common inline elements
a,
b,
big,
button,
canvas,
em,
i,
img,
input,
label,
map,
picture,
progress,
s,
select,
small,
span,
strong,
sub,
sup,
svg,
textarea,
time,
u,
video {
  .rotate-90 {
    display: inline-block;
    transform: rotate(90deg);
  }

  .rotate-180 {
    display: inline-block;
    transform: rotate(180deg);
  }

  .rotate-270 {
    display: inline-block;
    transform: rotate(270deg);
  }
}

.clickable:hover {
  cursor: pointer;
}
</style>
