'use strict';

(function () {
  var activatePage = function () {
    window.dom.map.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');

    window.ads.renderPinAd();
    window.ads.renderCardAd();
    window.ads.toggleCardsAds();

    window.util.removeDisabledTags(window.dom.mapFilterSelects);
    window.util.removeDisabledTags(window.dom.mapFilterFeatures);
    window.util.removeDisabledTags(window.dom.adFieldsets);

    window.map.mapPinMainTop = window.map.mapPinMainTopActive;
    window.map.setAddress(window.dom.mainPinAddress, window.map.mapPinParams.HEIGHT);

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

    window.ads.removeAds();

    document.querySelector('.map__filters').reset();
    window.dom.map.classList.add('map--faded');
    window.dom.mapPinMain.style.top = mapPinMainStart.y + 'px';
    window.dom.mapPinMain.style.left = mapPinMainStart.x + 'px';
    window.map.setAddress(window.dom.mainPinAddress, window.map.mapPinParams.HALF_HEIGHT);

    window.dom.mapPinMain.addEventListener('mousedown', activatePage);
    window.dom.mapPinMain.addEventListener('keydown', activatePageKeydown);

    window.dom.adForm.reset();
    window.dom.adForm.classList.add('ad-form--disabled');

    window.util.setDisabledTags(window.dom.mapFilterSelects);
    window.util.setDisabledTags(window.dom.mapFilterFeatures);
    window.util.setDisabledTags(window.dom.adFieldsets);
  };

  window.dom.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.dom.adForm), siteReset, window.onError);
  });

  window.dom.mapPinMain.addEventListener('mousedown', activatePage);
  window.dom.mapPinMain.addEventListener('keydown', activatePageKeydown);

  document.querySelector('.ad-form__reset').addEventListener('click', siteReset);

  window.util.setDisabledTags(window.dom.mapFilterSelects);
  window.util.setDisabledTags(window.dom.mapFilterFeatures);
  window.util.setDisabledTags(window.dom.adFieldsets);
})();
