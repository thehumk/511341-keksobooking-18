'use strict';

(function () {
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = document.querySelector('.map__pins').getBoundingClientRect().width;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

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

  window.dom.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      }

      

      window.dom.mapPinMain.style.top = (window.dom.mapPinMain.offsetTop - shiftCoords.y) + 'px';
      window.dom.mapPinMain.style.left = (window.dom.mapPinMain.offsetLeft - shiftCoords.x) + 'px';

      window.map.mapPinMainTop = Math.round(parseInt(window.dom.mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);
      mapPinMainLeft = Math.round(parseInt(window.dom.mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2);

      if (mapPinMainLeft <= MIN_COORDINATE_X) {
        window.dom.mapPinMain.style.left = (MIN_COORDINATE_X - parseInt(MAP_PIN_MAIN_WIDTH / 2, 10)) + 'px';
      }

      if (mapPinMainLeft >= MAX_COORDINATE_X) {
        window.dom.mapPinMain.style.left = (MAX_COORDINATE_X - MAP_PIN_MAIN_WIDTH / 2) + 'px';
      }

      if (window.map.mapPinMainTop <= MIN_COORDINATE_Y) {
        window.dom.mapPinMain.style.top = (MIN_COORDINATE_Y - MAP_PIN_MAIN_HEIGHT) + 'px';
      }

      if (window.map.mapPinMainTop >= MAX_COORDINATE_Y) {
        window.dom.mapPinMain.style.top = (MAX_COORDINATE_Y - MAP_PIN_MAIN_HEIGHT) + 'px';
      }

      console.log(window.map.mapPinMainTop);

      setAddress(window.dom.mainPinAddress);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddress(window.dom.mainPinAddress);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setAddress(window.dom.mainPinAddress);

  window.map.setAddress = setAddress;
})();
