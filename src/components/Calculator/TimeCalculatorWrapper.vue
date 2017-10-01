<template>
  <div>
    <add-substract-days-calculator></add-substract-days-calculator>
    <hr>
  </div>
</template>

<script>
import AddSubstractDaysCalculator from './TimeCalculator/AddSubstractDaysCalculator';

export default {
  name: 'time-calculator-wrapper',
  components: {
    AddSubstractDaysCalculator,
  },
};

</script>
