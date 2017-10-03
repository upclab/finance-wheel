<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h4 class="title is-4 mb-25">Adición/Sustracción de días</h4>
              <div class="field">
                <label class="label">Fecha</label>
                <div class="control has-icons-left">
                  <willow-datepicker v-model="date">></willow-datepicker>
                  <span class="icon is-small is-left">
                    <icon name="calendar"></icon>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Operación</label>
                <div class="control">
                  <div class="select">
                    <select v-model="operation">
                      <option :value="operations.add">Adicionar</option>
                      <option :value="operations.subtract">Sustraer</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="number" min="0" placeholder="0" v-model="daysToAdd">
                </p> 
                <p class="control">
                  <a class="button is-static">
                    días
                  </a>
                </p>
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
                    <span><strong><em>fecha inicial: </em></strong> {{ originalExtendedDate }}</span>

                    <span>{{ `  ${date}` }}</span>
                    <span>{{ `${operationSymbol} ${daysToAdd} días` }}</span>
                    <span>  __________________</span>
                    <span>{{ `  ${result}` }}</span>

                    <span><strong><em>fecha resultante: </em></strong> {{ resultExtendedDate }}</span>
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
import addSubtractDate from 'add-subtract-date';
import dateTime from 'date-and-time';

import WillowDatepicker from '@/components/Shared/Datepicker';

dateTime.locale('es');

const operations = {
  add: 'ADD',
  subtract: 'SUBTRACT',
};

export default {
  name: 'add-subtract-days-calculator',
  data() {
    return {
      date: '',
      daysToAdd: 0,
      operation: operations.add,
      operations,
    };
  },
  computed: {
    fieldsFilled() {
      if (this.date && this.daysToAdd !== '' && this.daysToAdd >= 0) {
        return true;
      }
      return false;
    },
    operationSymbol() {
      if (this.operation === operations.add) {
        return '+';
      }

      return '-';
    },
    originalExtendedDate() {
      const originalDate = dateTime.parse(this.date, 'DD-MM-YYYY');
      return dateTime.format(originalDate, 'dddd DD MMMM del YYYY');
    },
    result() {
      if (!this.fieldsFilled) {
        return '';
      }

      const originalDate = dateTime.parse(this.date, 'DD-MM-YYYY');
      let resultDate;

      if (this.operation === operations.add) {
        resultDate = addSubtractDate.add(originalDate, this.daysToAdd, 'days');
      } else {
        resultDate = addSubtractDate.subtract(originalDate, this.daysToAdd, 'days');
      }

      return dateTime.format(resultDate, 'DD-MM-YYYY');
    },
    resultExtendedDate() {
      const resultDate = dateTime.parse(this.result, 'DD-MM-YYYY');
      return dateTime.format(resultDate, 'dddd DD MMMM del YYYY');
    },
  },
  components: {
    WillowDatepicker,
  },
};

</script>
