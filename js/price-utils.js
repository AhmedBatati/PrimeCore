(function (global) {
  'use strict';

  var CURRENCIES = {
    SAR: 'ريال سعودي',
    USD: 'دولار',
    YER: 'ريال يمني'
  };

  function normalizeCurrency(currency) {
    var value = String(currency || '').trim();
    var upper = value.toUpperCase();

    if (upper === 'SAR') return 'SAR';
    if (upper === 'USD') return 'USD';
    if (upper === 'YER' || upper === 'YEM' || upper === 'RIAL YEMENI') return 'YER';
    if (value.indexOf('سعود') !== -1) return 'SAR';
    if (value.indexOf('دولار') !== -1) return 'USD';
    if (value.indexOf('يمن') !== -1) return 'YER';

    return 'SAR';
  }

  function currencyLabel(currency) {
    var code = normalizeCurrency(currency);
    return CURRENCIES[code] || CURRENCIES.SAR;
  }

  function formatPrice(amount, currency) {
    var number = Number(amount) || 0;
    var formatted = number.toLocaleString('en-US', {
      maximumFractionDigits: number % 1 === 0 ? 0 : 2
    });

    return formatted + ' ' + currencyLabel(currency);
  }

  global.PrimeCorePrices = {
    CURRENCIES: CURRENCIES,
    currencyLabel: currencyLabel,
    formatPrice: formatPrice,
    normalizeCurrency: normalizeCurrency
  };
})(window);
