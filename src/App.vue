<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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

@import "node_modules/bulma/bulma";
@import "assets/sass/utils/all";

</style>
