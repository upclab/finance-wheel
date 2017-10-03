<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h4 class="title is-4 mb-25">Calcular días entre Fechas</h4>
              <div class="field">
                <label class="label">Fecha de Inicio</label>
                <div class="control has-icons-left">
                  <willow-datepicker v-model="startDate">></willow-datepicker>
                  <span class="icon is-small is-left">
                    <icon name="calendar"></icon>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Fecha de Fin</label>
                <div class="control has-icons-left">
                  <willow-datepicker v-model="endDate">></willow-datepicker>
                  <span class="icon is-small is-left">
                    <icon name="calendar"></icon>
                  </span>
                </div>
              </div>
              <transition name="fade" mode="out-in">
                <p v-if="fieldsFilled" class="help is-success">El resultado se calculará automáticamente!</p>
              </transition>
            </div>
          </div>
        </div>

        <div class="level-right"> 
          <div class="level-item">
            <div>
              <h5 class="title is-5 mb-20">Solución</h5>
              <p v-if="!fieldsFilled">
                <em>Por favor llene los campos, para calcular el resultado!</em>
              </p>
              <div v-else>
                <pre class="board">
                  <code>
                    <p><strong><em>fecha inicial: </em></strong> {{ startDate }}</p>
                    <p><strong><em>fecha final: </em></strong> {{ endDate }}</p>
                    <br>
                    <p><strong><em>días: </em></strong> {{ days }}</p>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateDiff from 'date-difference';
import { parse } from 'date-and-time';

import WillowDatepicker from '@/components/Shared/Datepicker';

export default {
  name: 'days-betweeen-dates-calculator',
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    fieldsFilled() {
      if (this.startDate && this.endDate) {
        return true;
      }
      return false;
    },
    days() {
      if (!this.fieldsFilled) {
        return '';
      }

      const startDateObj = parse(this.startDate, 'DD-MM-YYYY');
      const endDateObj = parse(this.endDate, 'DD-MM-YYYY');

      return dateDiff(startDateObj, endDateObj);
    },
  },
  components: {
    WillowDatepicker,
  },
};

</script>
