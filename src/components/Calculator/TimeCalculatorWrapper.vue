<template>
  <div>
    <add-subtract-days-calculator></add-subtract-days-calculator>
    <hr>
  </div>
</template>

<script>
import AddSubtractDaysCalculator from './TimeCalculator/AddSubtractDaysCalculator';

export default {
  name: 'time-calculator-wrapper',
  components: {
    AddSubtractDaysCalculator,
  },
};

</script>
