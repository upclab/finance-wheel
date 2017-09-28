<template>
  <div class='pad-30'>
    <div class="tabs is-centered is-boxed">
      <ul>
        <router-link :tag="'li'" :to="{name: 'interest.simple'}" :active-class="'is-active'">
          <a>
            <span>Simple</span>
          </a>
        </router-link>
        <router-link :tag="'li'" :to="{name: 'interest.nominal'}" :active-class="'is-active'">
          <a>
            <span>Compuesto o Nominal</span>
          </a>
        </router-link>
        <router-link :tag="'li'" :to="{name: 'interest.effective'}" :active-class="'is-active'">
          <a>
            <span>Efectiva</span>
          </a>
        </router-link>
        <li>
          <a>
            <span>Conversión de Tasas</span>
          </a>
        </li>
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
  name: 'interest-wrapper',
};

</script>
