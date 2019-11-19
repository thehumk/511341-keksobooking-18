'use strict';

(function () {
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = document.querySelector('.map__pins').getBoundingClientRect().width;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var pinParams = {
    HALF_WIDTH: 33,
    HALF_HEIGHT: 33,
    HEIGHT: 65
  };

  var pinMainLeft = parseInt(window.dom.mapPinMain.style.left, 10) + pinParams.HALF_WIDTH;
  var pinMainTop = parseInt(window.dom.mapPinMain.style.top, 10) + pinParams.HALF_HEIGHT;

  var pinMainTopActive = parseInt(window.dom.mapPinMain.style.top, 10) + pinParams.HEIGHT;

  var setAddress = function (address, height) {
    address.setAttribute('value', (parseInt(window.dom.mapPinMain.style.left, 10) + pinParams.HALF_WIDTH) + ', ' + (parseInt(window.dom.mapPinMain.style.top, 10) + height));
  };

  var moveLimitation = function () {
    if (pinMainLeft <= MIN_COORDINATE_X) {
      window.dom.mapPinMain.style.left = (MIN_COORDINATE_X - pinParams.HALF_WIDTH) + 'px';
    } else if (pinMainLeft >= MAX_COORDINATE_X) {
      window.dom.mapPinMain.style.left = (MAX_COORDINATE_X - pinParams.HALF_WIDTH) + 'px';
    }

    if (window.map.pinMainTop <= MIN_COORDINATE_Y) {
      window.dom.mapPinMain.style.top = (MIN_COORDINATE_Y - pinParams.HEIGHT) + 'px';
    } else if (window.map.pinMainTop >= MAX_COORDINATE_Y) {
      window.dom.mapPinMain.style.top = (MAX_COORDINATE_Y - pinParams.HEIGHT) + 'px';
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

      window.map.pinMainTop = window.dom.mapPinMain.offsetTop - shiftCoords.y + pinParams.HEIGHT;
      pinMainLeft = window.dom.mapPinMain.offsetLeft - shiftCoords.x + pinParams.HALF_WIDTH;

      moveLimitation();

      setAddress(window.dom.mainPinAddress, pinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddress(window.dom.mainPinAddress, pinParams.HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    pinMainTop: pinMainTop,
    pinMainTopActive: pinMainTopActive,
    pinParams: pinParams,
    setAddress: setAddress
  };

  setAddress(window.dom.mainPinAddress, pinParams.HALF_HEIGHT);

})();
