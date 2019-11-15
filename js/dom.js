'use strict';

(function () {
  window.dom = {
    templatePin: document.querySelector('#pin').content.querySelector('.map__pin'),
    templateCard: document.querySelector('#card').content.querySelector('.map__card'),
    similarAd: document.querySelector('.map__pins'),

    mapFilterSelects: document.querySelectorAll('.map__filter'),
    mapFilterFeatures: document.querySelectorAll('.map__features'),
    adFieldsets: document.querySelectorAll('.ad-form fieldset'),

    mapPinMain: document.querySelector('.map__pin--main'),
    map: document.querySelector('.map'),
    mapFilter: document.querySelector('.map__filters-container'),
    adForm: document.querySelector('.ad-form'),
    mainPinAddress: document.querySelector('#address'),

    selectType: document.querySelector('#type'),
    inputPrice: document.querySelector('#price'),
    selectTimeIn: document.querySelector('#timein'),
    selectTimeOut: document.querySelector('#timeout'),
    selectRooms: document.querySelector('#room_number'),
    selectCapacity: document.querySelector('#capacity'),
    adFormReset: document.querySelector('.ad-form__reset')
  };
})();
