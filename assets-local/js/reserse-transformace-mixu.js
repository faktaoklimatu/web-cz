document.addEventListener('DOMContentLoaded', () => {
  const alphabeticProperties = ['name'];
  const $propertySelector = $('#mixes-sort-property-selector');
  const $sortOrderButton = $propertySelector
    .siblings('.sort-order-selector')
    .first();
  const $countryCards = $('#mix-transformation-survey-countries > .card');
  let sortProperty = $propertySelector[0].value;
  // 1 = ascending (A→Z, 0→9), -1 = descending (Z→A, 9→0)
  let sortOrder = 1;

  $propertySelector.parent().removeClass('d-none').addClass('d-flex');

  const sortCards = () => {
    let compareFn;
    const buttonClasses = ['fas'];

    // Update UI.
    if (alphabeticProperties.includes(sortProperty)) {
      if (sortOrder === 1) {
        buttonClasses.push('fa-arrow-down-a-z');
      } else {
        buttonClasses.push('fa-arrow-down-z-a');
      }

      compareFn = (a, b) => {
        const propA = a.dataset[sortProperty];
        const propB = b.dataset[sortProperty];
        return sortOrder * propA.localeCompare(propB, 'cs');
      };
    } else {
      if (sortOrder === 1) {
        buttonClasses.push('fa-arrow-down-1-9');
      } else {
        buttonClasses.push('fa-arrow-down-9-1');
      }

      compareFn = (a, b) => {
        const propA = Number(a.dataset[sortProperty]);
        const propB = Number(b.dataset[sortProperty]);
        return sortOrder * (propA - propB);
      };
    }

    $sortOrderButton.find('i')[0].className = buttonClasses.join(' ');

    // Sort the cards using CSS order property.
    $countryCards
      .get()
      .sort(compareFn)
      .forEach((card, i) => {
        card.style.order = 1 + i;
      });
  };

  $sortOrderButton.on('click', (event) => {
    event.preventDefault();
    sortOrder *= -1;
    sortCards();
  });

  $propertySelector.on('change', ({ target }) => {
    sortProperty = target.value;
    sortCards();
  });
});
