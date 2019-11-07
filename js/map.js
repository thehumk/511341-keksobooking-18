'use strict';

(function () {
  var MAP_PIN_MAIN_WIDTH = window.dom.mapPinMain.getBoundingClientRect().width;
  var MAP_PIN_MAIN_HEIGHT = window.dom.mapPinMain.getBoundingClientRect().height;

  var mapPinMainLeft = Math.round(parseInt(window.dom.mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2);
  var mapPinMainTop = Math.round(parseInt(window.dom.mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2);

  var mapPinMainTopActive = Math.round(parseInt(window.dom.mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);

  window.map = {
    mapPinMainTop: mapPinMainTop,
    mapPinMainTopActive: mapPinMainTopActive
  };

  var setAddress = function (address) {
    address.setAttribute('value', mapPinMainLeft + ', ' + window.map.mapPinMainTop);
  };

  setAddress(window.dom.mainPinAddress);

  window.map.setAddress = setAddress;
})();
