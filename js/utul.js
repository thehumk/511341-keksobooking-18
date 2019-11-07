'use strict';

(function () {
  var KEYCODE = {
    enterKey: 13,
    escKey: 27
  };

  var enterEvent = function (evt, action) {
    if (evt.keyCode === KEYCODE.enterKey) {
      action();
    }
  };

  var escEvent = function (evt, action) {
    if (evt.keyCode === KEYCODE.escKey) {
      action();
    }
  };

  var getRandomInteger = function (min, max) {
    var randomNumber = min + Math.random() * (max - min);
    return Math.round(randomNumber);
  };

  var createRandomArray = function (arr) {
    var randomArray = [];
    var randomArrayLength = window.util.getRandomInteger(0, arr.length);

    for (var i = 0; i < randomArrayLength; i++) {
      var randomArrayElement = window.util.getRandomInteger(0, arr.length - 1);

      if (!randomArray.includes(arr[randomArrayElement], 0)) {
        randomArray[i] = arr[randomArrayElement];
      }
    }

    randomArray = randomArray.filter(function (elem) {
      return elem !== undefined;
    });

    return randomArray;
  };

  var setDisabledTags = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabledTags = function (elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeAttribute('disabled');
    }
  };

  window.util = {
    KEYCODE: KEYCODE,
    enterEvent: enterEvent,
    escEvent: escEvent,
    getRandomInteger: getRandomInteger,
    createRandomArray: createRandomArray,
    setDisabledTags: setDisabledTags,
    removeDisabledTags: removeDisabledTags
  };
})();
