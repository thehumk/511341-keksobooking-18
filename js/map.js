'use strict';

(function () {
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = document.querySelector('.map__pins').getBoundingClientRect().width;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var mapPinParams = {
    HALF_WIDTH: 33,
    HALF_HEIGHT: 33,
    HEIGHT: 65
  };

  var mapPinMainLeft = parseInt(window.dom.mapPinMain.style.left, 10) + mapPinParams.HALF_WIDTH;
  var mapPinMainTop = parseInt(window.dom.mapPinMain.style.top, 10) + mapPinParams.HALF_HEIGHT;

  var mapPinMainTopActive = parseInt(window.dom.mapPinMain.style.top, 10) + mapPinParams.HEIGHT;

  window.map = {
    mapPinMainTop: mapPinMainTop,
    mapPinMainTopActive: mapPinMainTopActive,
    mapPinParams: mapPinParams
  };

  var setAddress = function (address, height) {
    address.setAttribute('value', (parseInt(window.dom.mapPinMain.style.left, 10) + mapPinParams.HALF_WIDTH) + ', ' + (parseInt(window.dom.mapPinMain.style.top, 10) + height));
  };

  var moveLimitation = function () {
    if (mapPinMainLeft <= MIN_COORDINATE_X) {
      window.dom.mapPinMain.style.left = (MIN_COORDINATE_X - mapPinParams.HALF_WIDTH) + 'px';
    } else if (mapPinMainLeft >= MAX_COORDINATE_X) {
      window.dom.mapPinMain.style.left = (MAX_COORDINATE_X - mapPinParams.HALF_WIDTH) + 'px';
    }

    if (window.map.mapPinMainTop <= MIN_COORDINATE_Y) {
      window.dom.mapPinMain.style.top = (MIN_COORDINATE_Y - mapPinParams.HEIGHT) + 'px';
    } else if (window.map.mapPinMainTop >= MAX_COORDINATE_Y) {
      window.dom.mapPinMain.style.top = (MAX_COORDINATE_Y - mapPinParams.HEIGHT) + 'px';
    }
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
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.dom.mapPinMain.style.top = (window.dom.mapPinMain.offsetTop - shiftCoords.y) + 'px';
      window.dom.mapPinMain.style.left = (window.dom.mapPinMain.offsetLeft - shiftCoords.x) + 'px';

      window.map.mapPinMainTop = window.dom.mapPinMain.offsetTop - shiftCoords.y + mapPinParams.HEIGHT;
      mapPinMainLeft = window.dom.mapPinMain.offsetLeft - shiftCoords.x + mapPinParams.HALF_WIDTH;

      moveLimitation();

      setAddress(window.dom.mainPinAddress, mapPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddress(window.dom.mainPinAddress, mapPinParams.HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setAddress(window.dom.mainPinAddress, mapPinParams.HALF_HEIGHT);
  window.map.setAddress = setAddress;

})();
