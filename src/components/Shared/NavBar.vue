<template>
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="static/Logo.png" alt="Finance Wheel: Tu asistente de problemas financieros!" height="28">
      </router-link>

      <div class="navbar-burger burger" :class="{'is-active': hamburgerMenuActive}" @click="toggleNavBarMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{'is-active': hamburgerMenuActive}">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" active-class="is-active" to="/interest/simple">Tasas de Interés</router-link>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" active-class="is-active" to="/interest/simple">
              Tasa de Interés Simple
            </router-link>
            <router-link class="navbar-item" active-class="is-active" to="/interest/nominal">
              Tasa de Interés Compuesta
            </router-link>
            <router-link class="navbar-item" active-class="is-active" to="/interest/effective">
              Tasa de Interés Efectiva
            </router-link>
            <hr class="navbar-divider">
            <a class="navbar-item" TODO>
              Conversión de Tasas
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" active-class="is-active" to="/calculator/math">Calculadoras</router-link>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" active-class="is-active" to="/calculator/math">
              Calculadora Matemática
            </router-link>
            <router-link class="navbar-item" active-class="is-active" to="/calculator/time">
              Calculadora de Tiempo
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <a class="navbar-item is-hidden-desktop-only" href="https://github.com/upclab/finance-wheel" target="_blank">
          <span class="icon" style="color: #333;">
            <icon name="github" scale="3"></icon>
          </span>
        </a>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <download-app-button></download-app-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import DownloadAppButton from './NavBarComponents/DownloadAppButton';

export default {
  name: 'nav-bar',
  data() {
    return {
      hamburgerMenuActive: false,
    };
  },
  methods: {
    toggleNavBarMenu() {
      this.hamburgerMenuActive = !this.hamburgerMenuActive;
    },
  },
  components: {
    DownloadAppButton,
  },
};

</script>

