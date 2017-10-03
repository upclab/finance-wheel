<template>
  <div>
    <add-subtract-days-calculator></add-subtract-days-calculator>
    <hr>
    <days-between-dates-calculator></days-between-dates-calculator>
  </div>
</template>

<script>
import AddSubtractDaysCalculator from './TimeCalculator/AddSubtractDaysCalculator';
import DaysBetweenDatesCalculator from './TimeCalculator/DaysBetweenDatesCalculator';

export default {
  name: 'time-calculator-wrapper',
  components: {
    AddSubtractDaysCalculator,
    DaysBetweenDatesCalculator,
  },
};

</script>
