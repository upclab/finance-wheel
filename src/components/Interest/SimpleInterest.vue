<template>
  <div>
    <div class="columns">
      <div class="column is-5">
        <options-panel @reset="resetOptions()">
          <label class="panel-block">
            <div>
              <input type="checkbox" v-model="use365Days">
              Año exacto
              <p class="help">Año exacto usa 365 días en vez de 360</p>
            </div>
          </label>
          <label class="panel-block-alike">
            <div class="field">
              <label class="label">Unidad de tiempo</label>
              <div class="control">
                <div class="select">
                  <select v-model="timeUnit">
                    <option :value="timePeriods.day">{{ periodToPluralSpanish(timePeriods.day) | capitalize }}</option>
                    <option :value="timePeriods.month">{{ periodToPluralSpanish(timePeriods.month) | capitalize }}</option>
                    <option :value="timePeriods.year">{{ periodToPluralSpanish(timePeriods.year) | capitalize }}</option>
                  </select>
                </div>
              </div>
            </div>
          </label>
          <label class="panel-block-alike">
            <div class="field">
              <label class="label">Datos iniciales</label>
              <p class="help" :class="{ 'is-danger': !dataEnoughToResolve, 'is-success': dataEnoughToResolve }">Se necesitan 3 datos</p>
            </div>
          </label>
           <label class="panel-block">
            <div>
              <input type="checkbox" :value="formulaEntities.principal" :disabled="disableDataCheckbox(formulaEntities.principal)" v-model="dataProvided">
              Capital (C)
            </div>
          </label>
          <label class="panel-block">
            <div>
              <input type="checkbox" :value="formulaEntities.rate" :disabled="disableDataCheckbox(formulaEntities.rate)" v-model="dataProvided">
              Tasa (i)
            </div>
          </label>
          <label class="panel-block">
            <div>
              <input type="checkbox" :value="formulaEntities.timeElapsed" :disabled="disableDataCheckbox(formulaEntities.timeElapsed)" v-model="dataProvided">
              Tiempo Transcurrido (t)
            </div>
          </label>
          <label class="panel-block">
            <div>
              <input type="checkbox" :value="formulaEntities.interest" :disabled="disableDataCheckbox(formulaEntities.interest)" v-model="dataProvided">
              Interés (I)
            </div>
          </label>
          <label class="panel-block">
            <div>
              <input type="checkbox" :value="formulaEntities.total" :disabled="disableDataCheckbox(formulaEntities.total)" v-model="dataProvided">
              Valor Futuro (S)
            </div>
          </label>
        </options-panel>
      </div>
      <div class="column is-7">
        <div>
          <template v-if="principalIsProvided">
            <label class="label">Capital (C)</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icons-left">
                <input v-model="principal" class="input" type="number" step="2" placeholder="Insertar capital">
                <span class="icon is-small is-left">
                  <icon name="money"></icon>
                </span>
              </div>
              <div class="control">
                <a class="button is-static">
                  soles
                </a>
              </div>
            </div>
          </template>
          <template v-if="rateIsProvided">
            <label class="label">Tasa (i)</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icons-left">
                <input v-model="rate" class="input" type="number" step="7" placeholder="Insertar tasa">
                <span class="icon is-small is-left">
                  <icon name="percent"></icon>
                </span>
              </div>
              <div class="control">
                <a class="button is-static">
                  %
                </a>
              </div>
            </div>
          </template>
          <template v-if="timeElapsedIsProvided">
            <label class="label">Tiempo (t)</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icons-left">
                <input v-model="timeElapsed" class="input" type="number" step="0" placeholder="Insertar tiempo transcurrido">
                <span class="icon is-small is-left">
                  <icon name="clock-o"></icon>
                </span>
              </div>
              <div class="control">
                <a class="button is-static">{{ periodToPluralSpanish(timeUnit) }}</a>
              </div>
            </div>
          </template>
          <template v-if="interestIsProvided">
            <label class="label">Interés (I)</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icons-left">
                <input v-model="interest" class="input" type="number" step="2" placeholder="Insertar interés">
                <span class="icon is-small is-left">
                  <icon name="money"></icon>
                </span>
              </div>
              <div class="control">
                <a class="button is-static">
                  soles
                </a>
              </div>
            </div>
          </template>
          <template v-if="totalIsProvided">
            <label class="label">Valor Futuro (S)</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icons-left">
                <input v-model="total" class="input" type="number" step="2" placeholder="Insertar valor futuro">
                <span class="icon is-small is-left">
                  <icon name="money"></icon>
                </span>
              </div>
              <div class="control">
                <a class="button is-static">
                  soles
                </a>
              </div>
            </div>
          </template>
        </div>
        <hr>
        <div>
          <h5 class="title is-5 mb-20">Solución</h5>
          <p v-if="!fieldsFilled">
            <em>Por favor llene los campos, para calcular el resultado!</em>
          </p>
          <div v-else>
            <pre class="board">
              <code>
                <p v-if="principalIsProvided"><strong><em>C: capital: </em></strong>{{ principal | money | soles }} soles</p>
                <p v-if="rateIsProvided"><strong><em>i: tasa: </em></strong>{{ `${rate}%` }}</p>
                <p v-if="timeElapsedIsProvided"><strong><em>tiempo transcurrido: </em></strong>{{ `${timeElapsed} ${periodToPluralSpanish(timeUnit)}` }}<span v-if="timeUnit != timePeriods.day">{{ ` = ${time} días` }}</span></p>
                <p v-if="interestIsProvided"><strong><em>I: interés: </em></strong>{{ interest | money | soles }} soles</p>
                <p v-if="totalIsProvided"><strong><em>S: valor futuro: </em></strong>{{ total | money | soles }} soles</p>

                <template v-if="!rateIsProvided">
                  <br>
                  <p><strong><em>i: Tasa</em></strong></p>
                  <p><strong><em class="is-size-6">i = [(S / C) - 1] / t</em></strong></p>
                  <p><strong><em>i = </em></strong>[({{ calculatedTotal | money }} / {{ principal | money }}) - 1] / {{ periodTime }}</p>
                  <p><strong><em>i = </em></strong>{{ `${calculatedRate}%` }} soles</p>
                </template>

                <template v-if="true">
                  <br>
                  <p><strong><em>t: tiempo: </em></strong></p>
                  <p><strong><em class="is-size-6">{{`t = tiempo transcurrido / ${daysInAYear}`}}</em></strong></p>
                  <p><strong><em>t = </em></strong>{{ `${time} / ${daysInAYear}` }}</p>
                  <p><strong><em>t = </em></strong>{{ periodTime }}</p>
                </template>

                <template v-if="!interestIsProvided">
                  <br>
                  <p><strong><em>I: interés</em></strong></p>
                  <p><strong><em class="is-size-6">I = C x i x t</em></strong></p>
                  <p><strong><em>I = </em></strong>{{ principal | money }} x {{ `${rate}%` }} x {{ periodTime }}</p>
                  <p><strong><em>I = </em></strong>{{ calculatedInterest | money | soles }} soles</p>
                </template>

                <template v-if="!totalIsProvided">
                  <br>
                  <p><strong><em>S: valor futuro</em></strong></p>
                  <div v-if="interestIsProvided">
                    <p><strong><em class="is-size-6">S = C + I</em></strong></p>
                    <p><strong><em>S = </em></strong>{{ principal | money }} + {{ calculatedInterest | money }}</p>
                    <p><strong><em>S = </em></strong>{{ calculatedTotal | money | soles }} soles</p>
                  </div><div v-else>
                    <p><strong><em class="is-size-6">S = C * (1 + i * t)</em></strong></p>
                    <p><strong><em>S = </em></strong>{{ principal | money }} * {{ `(1 + ${rate}% * ${periodTime})` }}</p>
                    <p><strong><em>S = </em></strong>{{ calculatedTotal | money | soles }} soles</p>
                  </div>
                </template>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import arrayDiff from 'simple-array-diff';

import OptionsPanel from '@/components/Shared/OptionsPanel';
import timePeriods from '@/finance/Time/TimePeriods';
import capitalize from '@/filters/capitalize';
import money from '@/filters/money';
import soles from '@/filters/soles';

import { periodToPluralSpanish, periodToDays } from '@/finance/Time/Utils';

const formulaEntities = {
  principal: 'PRINCIPAL', // C
  rate: 'RATE', // i
  timeElapsed: 'TIME-ELAPSED', // tiempo transcurrido
  interest: 'INTEREST', // I
  total: 'TOTAL', // S
};

const defaultOptions = {
  use365Days: false,
  timeUnit: timePeriods.day,
  dataProvided: [
    formulaEntities.principal,
    formulaEntities.interest,
    formulaEntities.timeElapsed,
  ],
};

export default {
  name: 'simple-interest-wrapper',
  data() {
    return {
      principal: '',
      rate: '',
      timeElapsed: '',
      interest: '',
      total: '',
      dataProvided: defaultOptions.dataProvided,
      use365Days: defaultOptions.use365Days,
      timeUnit: defaultOptions.timeUnit,
      timePeriods,
      formulaEntities,
    };
  },
  computed: {
    principalIsProvided() {
      return this.dataProvided.indexOf(formulaEntities.principal) !== -1;
    },
    rateIsProvided() {
      return this.dataProvided.indexOf(formulaEntities.rate) !== -1;
    },
    timeElapsedIsProvided() {
      return this.dataProvided.indexOf(formulaEntities.timeElapsed) !== -1;
    },
    interestIsProvided() {
      return this.dataProvided.indexOf(formulaEntities.interest) !== -1;
    },
    totalIsProvided() {
      return this.dataProvided.indexOf(formulaEntities.total) !== -1;
    },
    dataEnoughToResolve() {
      return this.dataProvided.length >= 3;
    },
    dataWillGetResolved() {
      if (!this.dataEnoughToResolve) {
        return [];
      }

      const result = arrayDiff(
        Object.values(this.formulaEntities),
        this.dataProvided,
      );

      return result.removed;
    },
    fieldsFilled() {
      if (!this.dataEnoughToResolve) {
        return false;
      }

      for (let index = 0; index < this.dataProvided.length; index += 1) {
        const entityName = this.dataProvided[index];

        if (!this.checkDataFilled(entityName)) {
          return false;
        }
      }

      return true;
    },
    time() {
      if (!this.fieldsFilled) {
        return 0;
      }
      return periodToDays(this.timeElapsed, this.timeUnit);
    },
    daysInAYear() {
      return this.use365Days ? 365 : 360;
    },
    periodTime() {
      if (!this.fieldsFilled) {
        return 0;
      }
      return this.time / this.daysInAYear;
    },
    calculatedRate() {
      if (!this.fieldsFilled) {
        return 0;
      }
      return (((Number(this.calculatedTotal) / Number(this.principal)) - 1) * 100)
        / this.periodTime;
    },
    calculatedInterest() {
      if (!this.fieldsFilled) {
        return 0;
      }
      if (this.rateIsProvided) {
        return Number(this.principal) * Number(this.rate / 100) * this.periodTime;
      }
      return this.interest;
    },
    calculatedTotal() {
      if (!this.fieldsFilled) {
        return 0;
      }
      if (this.interestIsProvided) {
        return Number(this.principal) + Number(this.calculatedInterest);
      }
      return this.total;
    },
  },
  filters: {
    capitalize,
    money,
    soles,
  },
  methods: {
    resetOptions() {
      this.use365Days = defaultOptions.use365Days;
      this.timeUnit = defaultOptions.timeUnit;
      this.dataProvided = defaultOptions.dataProvided;
    },
    disableDataCheckbox(dataEntity) {
      return this.dataProvided.length >= 3 && this.dataProvided.indexOf(dataEntity) === -1;
    },
    principalIsFilled() {
      return this.principal !== '';
    },
    rateIsFilled() {
      return this.rate !== '';
    },
    timeElapsedIsFilled() {
      return this.timeElapsed !== '';
    },
    interestIsFilled() {
      return this.interest !== '';
    },
    totalIsFilled() {
      return this.total !== '';
    },
    checkDataFilled(entityName) {
      /* eslint-disable */
      switch (entityName) {
        case formulaEntities.principal:
          return this.principalIsFilled();

        case formulaEntities.rate:
          return this.rateIsFilled();

        case formulaEntities.timeElapsed:
          return this.timeElapsedIsFilled();

        case formulaEntities.interest:
          return this.interestIsFilled();

        case formulaEntities.total:
          return this.totalIsFilled();

        default:
          return false;
      }
    },
    periodToPluralSpanish,
  },
  components: {
    OptionsPanel,
  },
};

</script>
