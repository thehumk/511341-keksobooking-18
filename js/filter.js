'use strict';

(function () {
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelectorAll('.map__checkbox');
  var TIMEOUT = 500;

  var Price = {
    LOW_RANGE: 10000,
    HIGHT_RANGE: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var lastTimeout;

  var filterByField = function (filterElement, dataField) {
    return filterElement.value === 'any' ? true : dataField.toString() === filterElement.value;
  };

  var filterByPrice = function (dataField) {
    if (priceFilter.value === Price.LOW) {
      return dataField < Price.LOW_RANGE;
    } else if (priceFilter.value === Price.MIDDLE) {
      return dataField >= Price.LOW_RANGE && dataField < Price.HIGHT_RANGE;
    } else if (priceFilter.value === Price.HIGH) {
      return dataField >= Price.HIGHT_RANGE;
    }
    return true;
  };

  var filterByFeatures = function (dataField) {
    var featuresFilterChecked = document.querySelectorAll('.map__checkbox:checked');
    var featuresChecked = Array.from(featuresFilterChecked);

    return featuresChecked.every(function (elem) {
      return dataField.includes(elem.value);
    });
  };

  var renderFilterAds = function (ads, target, quantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(target(ads[i]));
      if (i >= quantity - 1) {
        break;
      }
    }
    window.dom.similarAd.appendChild(fragment);
  };

  window.filteredAds = function () {
    return window.xhr.response.filter(function (elem) {
      return filterByField(typeFilter, elem.offer.type) &&
        filterByField(roomsFilter, elem.offer.rooms) &&
        filterByField(guestsFilter, elem.offer.guests) &&
        filterByPrice(elem.offer.price) &&
        filterByFeatures(elem.offer.features);
    });
  };

  var createFilteredAds = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.ads.removeData();
      var filterAds = window.filteredAds();

      renderFilterAds(filterAds, window.ads.createPins, window.ads.QUANTITY_ELEMENTS);
      renderFilterAds(filterAds, window.ads.createCards, window.ads.QUANTITY_ELEMENTS);
      window.ads.toggleCards();
    }, TIMEOUT);
  };

  typeFilter.addEventListener('change', createFilteredAds);
  roomsFilter.addEventListener('change', createFilteredAds);
  guestsFilter.addEventListener('change', createFilteredAds);
  priceFilter.addEventListener('change', createFilteredAds);
  featuresFilter.forEach(function (elem) {
    elem.addEventListener('change', createFilteredAds);
  });
})();
