<template>
  <div class="panel">
    <p class="panel-heading">
      Opciones
    </p>
    <slot></slot>
    <div class="panel-block">
      <button class="button is-primary is-outlined is-fullwidth" @click="$emit('reset')">
        Restablecer Opciones
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'options-panel',
};

</script>
