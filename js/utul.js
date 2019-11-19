'use strict';

(function () {
  var KEYCODE = {
    enter: 13,
    esc: 27
  };

  var enterEvent = function (evt, action) {
    if (evt.keyCode === KEYCODE.enter) {
      action();
    }
  };

  var getRandomInteger = function (min, max) {
    var randomNumber = min + Math.random() * (max - min);
    return Math.round(randomNumber);
  };

  var setDisabledTags = function (elems) {
    elems.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var removeDisabledTags = function (elems) {
    elems.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  window.util = {
    KEYCODE: KEYCODE,
    enterEvent: enterEvent,
    getRandomInteger: getRandomInteger,
    setDisabledTags: setDisabledTags,
    removeDisabledTags: removeDisabledTags
  };
})();
