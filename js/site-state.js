'use strict';

(function () {
  var activatePage = function () {
    window.dom.map.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');
    window.ads.renderData(window.ads.createPins);
    window.ads.renderData(window.ads.createCards);
    window.ads.toggleCards();

    window.util.removeDisabledTags(window.dom.mapFilterSelects);
    window.util.removeDisabledTags(window.dom.mapFilterFeatures);
    window.util.removeDisabledTags(window.dom.adFieldsets);

    window.map.pinMainTop = window.map.pinMainTopActive;
    window.map.setAddress(window.dom.mainPinAddress, window.map.pinParams.HEIGHT);

    window.dom.selectType.addEventListener('change', window.validation.changeType);
    window.dom.selectTimeIn.addEventListener('change', window.validation.changeTimeIn);
    window.dom.selectTimeOut.addEventListener('change', window.validation.changeTimeOut);
    window.dom.selectCapacity.addEventListener('change', window.validation.changeValue);
    window.dom.selectRooms.addEventListener('change', window.validation.changeValue);

    window.onSubmit = function (evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(window.dom.adForm), siteReset, window.backend.onError);
    };

    window.dom.adForm.addEventListener('submit', window.onSubmit);

    window.dom.mapPinMain.removeEventListener('mousedown', activatePage);
    window.dom.mapPinMain.removeEventListener('keydown', activatePageKeydown);
  };

  var activatePageKeydown = function (evt) {
    window.util.enterEvent(evt, activatePage);
  };

  var siteReset = function () {
    var mapPinMainStart = {
      x: 570,
      y: 375
    };

    window.ads.removeData();

    document.querySelector('.map__filters').reset();
    window.dom.map.classList.add('map--faded');
    window.dom.mapPinMain.style.top = mapPinMainStart.y + 'px';
    window.dom.mapPinMain.style.left = mapPinMainStart.x + 'px';
    window.map.setAddress(window.dom.mainPinAddress, window.map.pinParams.HALF_HEIGHT);

    window.dom.mapPinMain.addEventListener('mousedown', activatePage);
    window.dom.mapPinMain.addEventListener('keydown', activatePageKeydown);

    window.dom.adForm.reset();
    window.dom.adForm.classList.add('ad-form--disabled');
    window.dom.adForm.removeEventListener('submit', window.onSubmit);

    window.dom.selectType.removeEventListener('change', window.validation.changeType);
    window.dom.selectTimeIn.removeEventListener('change', window.validation.changeTimeIn);
    window.dom.selectTimeOut.removeEventListener('change', window.validation.changeTimeOut);
    window.dom.selectCapacity.removeEventListener('change', window.validation.changeValue);
    window.dom.selectRooms.removeEventListener('change', window.validation.changeValue);

    window.util.setDisabledTags(window.dom.mapFilterSelects);
    window.util.setDisabledTags(window.dom.mapFilterFeatures);
    window.util.setDisabledTags(window.dom.adFieldsets);
  };

  window.dom.mapPinMain.addEventListener('mousedown', activatePage);
  window.dom.mapPinMain.addEventListener('keydown', activatePageKeydown);

  document.querySelector('.ad-form__reset').addEventListener('click', siteReset);

  window.util.setDisabledTags(window.dom.mapFilterSelects);
  window.util.setDisabledTags(window.dom.mapFilterFeatures);
  window.util.setDisabledTags(window.dom.adFieldsets);
})();
