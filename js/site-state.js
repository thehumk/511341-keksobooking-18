'use strict';

(function () {
  var activatePage = function () {
    window.dom.map.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');

    window.ads.renderPinAd();
    window.ads.renderCardAd();
    window.ads.openCardsAds();
    window.util.removeDisabledTags(window.dom.mapFilterSelects);
    window.util.removeDisabledTags(window.dom.mapFilterFeatures);
    window.util.removeDisabledTags(window.dom.adFieldsets);

    window.map.mapPinMainTop = window.map.mapPinMainTopActive;

    window.map.setAddress(window.dom.mainPinAddress);

    window.dom.mapPinMain.removeEventListener('mousedown', activatePage);
    window.dom.mapPinMain.removeEventListener('keydown', activatePageKeydown);
  };

  var activatePageKeydown = function (evt) {
    window.util.enterEvent(evt, activatePage);
  };

  window.dom.mapPinMain.addEventListener('mousedown', activatePage);

  window.dom.mapPinMain.addEventListener('keydown', activatePageKeydown);

  window.util.setDisabledTags(window.dom.mapFilterSelects);
  window.util.setDisabledTags(window.dom.mapFilterFeatures);
  window.util.setDisabledTags(window.dom.adFieldsets);
})();


