<template>
  <div class="columns is-vcentered">
    <div class="column is-8 has-text-centered">
      <img src="./../assets/logo.png">
    </div>
    <div class="column is-4 pad-0">
      <div class="hero is-fullheight bg-primary">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div id="right-column" class="column is-10 is-offset-1 has-text-right">
                <div v-if="isElectronBuild">
                  <h1 class="title has-text-white">Gracias!</h1>
                  <h2 class="subtitle has-text-white">por confiar en nosotros!</h2>
                </div>
                <div v-else>
                  <h1 class="title has-text-white">Bienvenid@!</h1>
                  <h2 class="subtitle has-text-white">a tu asistente de finanzas!</h2>
                </div>
                <div class="content is-medium is-self-aligned-end">
                  <ul class="has-no-decoration">
                    <li><a class="has-text-white" href="http://github.com/upclab/finance-wheel" target="_blank">Acerca De</a></li>
                    <li><a class="has-text-white" href="http://github.com/upclab/finance-wheel" target="_blank">Repositorio</a></li>
                    <li><a class="has-text-white" href="http://github.com/upclab/finance-wheel/issues" target="_blank">Dudas</a></li>
                  </ul>
                </div>
                <div class="is-self-aligned-end">
                  <router-link to="/interest/simple">
                    <button class="button is-primary is-inverted is-outlined is-large">Empezar</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      isElectronBuild: ELECTRON_BUILD,
    };
  },
};
</script>

<style lang="scss" scoped>
  #right-column {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-height: 523px;

      div {
        width: 100%;
      }
  }

  ul {
    position: relative;
  }


  li {
    transition: all 0.4s ease;

    &:hover {
      transform: translateX(-25px);
    }
  }

</style>
