<template>
  <datepicker v-bind:value="internalValue" v-on:input="(value) => updateValue(value)" :placeholder="internalPlaceholder" :config="config"></datepicker>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker';
import { es } from 'flatpickr/dist/l10n/es';

export default {
  name: 'willow-datepicker',
  props: ['placeholder', 'value'],
  data() {
    return {
      internalValue: this.value,
      internalPlaceholder: this.placeholder || 'Selecciona una fecha',
      config: {
        dateFormat: 'd-m-Y',
        static: 'true',
        locale: es,
      },
    };
  },
  methods: {
    updateValue(value) {
      this.internalValue = value;
      this.$emit('input', value);
    },
  },
  components: {
    Datepicker,
  },
};

</script>
