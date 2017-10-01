<template>
  <div class='pad-30'>
    <div class="tabs is-centered is-boxed">
      <ul>
        <router-link :tag="'li'" :to="{name: 'calculator.math'}" :active-class="'is-active'">
          <a>
            <span>Matemática</span>
          </a>
        </router-link>
        <router-link :tag="'li'" :to="{name: 'calculator.time'}" :active-class="'is-active'">
          <a>
            <span>Tiempo</span>
          </a>
        </router-link>
      </ul>
    </div>
    <div class="columns">
      <div class="column is-12">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator-wrapper',
};

</script>
