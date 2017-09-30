<template>
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="static/Logo.png" alt="Finance Wheel: Tu asistente de problemas financieros!" height="28">
      </router-link>
      <a class="navbar-item is-hidden-desktop" href="https://github.com/upclab/finance-wheel" target="_blank">
        <span class="icon" style="color: #333;">
          <icon name="github" scale="3"></icon>
        </span>
      </a>
    </div>

    <div id="navMenuTransparentExample" class="navbar-menu">
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
              <a class="button is-primary" href="https://github.com/upclab/finance-wheel">
                <span class="icon">
                  <icon name="download"></icon>
                </span>
                <span>Descargar App</span>
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar',
};

</script>

