import currencyFormatter from 'currency-formatter';

export default function money(value) {
  return currencyFormatter.format(value, {
    decimal: '.',
    thousand: '\'',
    precision: 2,
    format: '%v',
  });
}
