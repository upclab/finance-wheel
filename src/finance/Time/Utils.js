import timePeriods from './TimePeriods';

export function periodToDays(time, timePeriod) {
  switch (timePeriod) {
    case timePeriods.day:
      return 1 * time;

    case timePeriods.biweekly:
      return 15 * time;

    case timePeriods.month:
      return 30 * time;

    case timePeriods.bimonthly:
      return 60 * time;

    case timePeriods.quarter:
      return 90 * time;

    case timePeriods.fourMonth:
      return 120 * time;

    case timePeriods.semester:
      return 180 * time;

    case timePeriods.year:
      return 360 * time;

    default:
      return time;
  }
}

export function periodToPluralSpanish(timePeriod) {
  switch (timePeriod) {
    case timePeriods.day:
      return 'días';

    case timePeriods.biweekly:
      return 'quincenas';

    case timePeriods.month:
      return 'meses';

    case timePeriods.bimonthly:
      return 'bimestres';

    case timePeriods.quarter:
      return 'trimestres';

    case timePeriods.fourMonth:
      return 'cuatrimestres';

    case timePeriods.semester:
      return 'semestres';

    case timePeriods.year:
      return 'años';

    default:
      return 'periodo no reconocido';
  }
}
