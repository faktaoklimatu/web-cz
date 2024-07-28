document.addEventListener('DOMContentLoaded', () => {
  const numberFormatOptions = { maximumFractionDigits: 1, minimumFractionDigits: 1 };
  const formatNumber = Intl.NumberFormat('cs-CZ', numberFormatOptions).format;

  const $allowancePrice = $('#allowance-price-number');
  const $allowancePriceInput = $('#allowance-input-range');
  const $exchangeRate = $('#exchange-rate');
  const exchangeRate = Number($exchangeRate.text());

  // List of fuels displayed in calculator.
  const $fuels = $('.fuel');

  const updatePrices = () => {
    const allowancePriceEur = Number($allowancePriceInput.val());

    // Update allowance price in local currency.
    const allowancePriceLocal = allowancePriceEur * exchangeRate;
    $allowancePrice.text(allowancePriceEur);
    $('#allowance-price-czk').text(formatNumber(allowancePriceLocal));

    $fuels.each((_i, fuelRow) => {
      const $priceIncrease = $('.price-increase', fuelRow);
      const $percentage = $('.price-increase-percent', fuelRow);
      const fuelPrice = Number($('.fuel-price', fuelRow).text());
      const carbonContent = fuelRow.dataset.carbonContent;

      // Update price increase and price increase percentage components.
      const priceIncrease = allowancePriceLocal * carbonContent / 1000;
      const priceIncreasePercent = 100 * priceIncrease / fuelPrice;

      $priceIncrease.text(`+${formatNumber(priceIncrease)}`);
      $percentage.text(formatNumber(priceIncreasePercent));
    });
  };

  $allowancePriceInput.on('input', () => {
    updatePrices();
  });

  updatePrices();
});
