<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <nav-bar v-if="!pathIsWelcome"></nav-bar>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/Shared/NavBar';

export default {
  name: 'finance-wheel',
  computed: {
    pathIsWelcome() {
      return this.$route.path === '/';
    },
  },
  components: {
    NavBar,
  },
};

</script>

<style lang="scss">
@import "node_modules/bulma/sass/utilities/initial-variables";

$blue: #76AED2;
$red: #FD9898;
$purple: #8b76d2;

$family-sans-serif: BlinkMacSystemFont, -apple-system, "Lato", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

$primary: $purple;
$danger: $red;

$scu-margins: (0 5 10 15 20 30);

@import "node_modules/bulma/bulma";
@import "node_modules/sass-util/main";

@import "assets/sass/utils/all";
@import "assets/sass/animations/all";

</style>
