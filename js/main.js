'use strict';

var ENTER_KEY = 13;

/* Получение случайного числа */

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.round(randomNumber);
};

/* Моки */

var nearbyAds = [];

var SIMILAR_ADS = 8;
var TYPE_REALTY = ['palace', 'flat', 'house', 'bungalo'];
var SIMILAR_CHECKIN = ['12:00', '13:00', '14:00'];
var SIMILAR_CHECKOUT = ['12:00', '13:00', '14:00'];
var AMENITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_ADJUSTMENT_X = -25;
var LOCATION_ADJUSTMENT_Y = -70;
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 4;
var MIN_GUEST = 1;
var MAX_GUEST = 5;
var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = document.querySelector('.map__pins').getBoundingClientRect().width;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

var createRandomArray = function (arr) {
  var randomArray = [];
  var randomArrayLength = getRandomInteger(0, arr.length);

  for (var i = 0; i < randomArrayLength; i++) {
    var randomArrayElement = getRandomInteger(0, arr.length - 1);

    if (!randomArray.includes(arr[randomArrayElement], 0)) {
      randomArray[i] = arr[randomArrayElement];
    }
  }

  randomArray = randomArray.filter(function (elem) {
    return elem !== undefined;
  });

  return randomArray;
};

var createSimilarAds = function () {
  for (var i = 0; i < SIMILAR_ADS; i++) {
    nearbyAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Уютное гнездышко для молодоженов',
        address: '',
        price: getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: TYPE_REALTY[getRandomInteger(0, TYPE_REALTY.length - 1)],
        rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInteger(MIN_GUEST, MAX_GUEST),
        checkin: SIMILAR_CHECKIN[getRandomInteger(0, SIMILAR_CHECKIN.length - 1)],
        checkout: SIMILAR_CHECKOUT[getRandomInteger(0, SIMILAR_CHECKOUT.length - 1)],
        features: createRandomArray(AMENITIES),
        description: 'строка с описанием',
        photos: createRandomArray(PHOTOS)
      },

      location: {
        x: getRandomInteger(MIN_COORDINATE_X, MAX_COORDINATE_X),
        y: getRandomInteger(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
      }
    };

    nearbyAds[i].offer.address = nearbyAds[i].location.x + ', ' + nearbyAds[i].location.y;
  }
};

createSimilarAds();

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var similarAd = document.querySelector('.map__pins');

var createPinsAds = function (ads) {
  var similarPin = templatePin.cloneNode(true);

  similarPin.style.left = ads.location.x + LOCATION_ADJUSTMENT_X + 'px';
  similarPin.style.top = ads.location.y + LOCATION_ADJUSTMENT_Y + 'px';
  similarPin.querySelector('img').src = ads.author.avatar;
  similarPin.querySelector('img').alt = ads.offer.title;

  return similarPin;
};

var renderFragmentElement = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < nearbyAds.length; i++) {
    fragment.appendChild(createPinsAds(nearbyAds[i]));
  }

  similarAd.appendChild(fragment);
};

/* Отключение фильтра и формы объявления */

var mapFilterSelects = document.querySelectorAll('.map__filter');
var mapFilterFeatures = document.querySelectorAll('.map__features');

var adFieldsets = document.querySelectorAll('.ad-form fieldset');


var setDisabledTags = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', 'disabled');
  }
};

setDisabledTags(mapFilterSelects);
setDisabledTags(mapFilterFeatures);
setDisabledTags(adFieldsets);

/* Включение фильтра и формы объявления */

var removeDisabledTags = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled');
  }
};

/* Активация страницы */

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

var MAP_PIN_MAIN_WIDTH = mapPinMain.getBoundingClientRect().width;
var MAP_PIN_MAIN_HEIGHT = mapPinMain.getBoundingClientRect().height;

var mapPinMainLeft = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2);
var mapPinMainTop = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2);

var activePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderFragmentElement();

  removeDisabledTags(mapFilterSelects);
  removeDisabledTags(mapFilterFeatures);
  removeDisabledTags(adFieldsets);

  mapPinMainTop = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);

  setAddress(mainPinAddress);
};

mapPinMain.addEventListener('mousedown', function () {
  activePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    activePage();
  }
});

/* Подстановка координат метки */

var mainPinAddress = document.querySelector('#address');

var setAddress = function (address) {
  address.setAttribute('value', mapPinMainLeft + ', ' + mapPinMainTop);
};

setAddress(mainPinAddress);

/* Валидация комнат и гостей */

var SELECT_ROOMS = document.querySelector('#room_number');
var SELECT_CAPACITY = document.querySelector('#capacity');

var selectedRoomValue = parseInt(SELECT_ROOMS[SELECT_ROOMS.options.selectedIndex].value, 10);
var selectedCapacity = SELECT_CAPACITY.options.selectedIndex;

var validatedCopacity = [];
var NOT_GUEST_ROOM = 100;
var NOT_GUEST_ROOM_VALUE = 0;

var validateCopacity = function (quantityRooms) {
  for (var i = 0; i < SELECT_CAPACITY.length; i++) {
    if (quantityRooms === NOT_GUEST_ROOM) {
      validatedCopacity[i] = false;
    } else {
      if (SELECT_CAPACITY[i].value <= quantityRooms && parseInt(SELECT_CAPACITY[i].value, 10) !== NOT_GUEST_ROOM_VALUE) {
        validatedCopacity[i] = true;
      } else {
        validatedCopacity[i] = false;
      }
    }
  }
};

SELECT_ROOMS.addEventListener('invalid', function () {
  if (selectedRoomValue === 100 && selectedCapacity === SELECT_CAPACITY.length - 1) {
    SELECT_ROOMS.setCustomValidity('');
  } else if (!validatedCopacity[selectedCapacity]) {
    SELECT_ROOMS.setCustomValidity('Для данного количества гостей понадобится больше комнат');
  } else {
    SELECT_ROOMS.setCustomValidity('');
  }
});

var invalidRooms = new Event('invalid');
SELECT_ROOMS.dispatchEvent(invalidRooms);

var changeValue = function () {
  selectedRoomValue = parseInt(SELECT_ROOMS[SELECT_ROOMS.options.selectedIndex].value, 10);
  selectedCapacity = SELECT_CAPACITY.options.selectedIndex;

  validateCopacity(selectedRoomValue);
  SELECT_ROOMS.dispatchEvent(invalidRooms);
};

SELECT_CAPACITY.addEventListener('change', function () {
  changeValue();
});

SELECT_ROOMS.addEventListener('change', function () {
  changeValue();
});
