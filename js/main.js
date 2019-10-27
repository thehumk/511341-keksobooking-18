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

var removeDisabledTags = function (elems) {
  for (var i = 0; i < elems.length; i++) {
    elems[i].removeAttribute('disabled');
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

var MapPinMainTopActive = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderFragmentElement();

  removeDisabledTags(mapFilterSelects);
  removeDisabledTags(mapFilterFeatures);
  removeDisabledTags(adFieldsets);

  mapPinMainTop = MapPinMainTopActive;

  setAddress(mainPinAddress);
};

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    activatePage();
  }
});

/* Подстановка координат метки */

var mainPinAddress = document.querySelector('#address');

var setAddress = function (address) {
  address.setAttribute('value', mapPinMainLeft + ', ' + mapPinMainTop);
};

setAddress(mainPinAddress);

/* Валидация комнат и гостей */

var selectRooms = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

var selectedRoomValue = parseInt(selectRooms[selectRooms.options.selectedIndex].value, 10);
var selectedCapacityValue = parseInt(selectCapacity[selectCapacity.options.selectedIndex].value, 10);

var capacityRoomsForGuests = {
  0: [100],
  1: [1, 2, 3],
  2: [2, 3],
  3: [3]
};

var getValidateCapacity = function (quantityGuests) {
  var validatedCapacity = capacityRoomsForGuests[quantityGuests];

  var validationResult = false;

  for (var i = 0; i < validatedCapacity.length; i++) {
    if (selectedRoomValue === validatedCapacity[i]) {
      validationResult = true;
      break;
    }
  }

  return validationResult;
};

var getInvalidRooms = function () {
  if (!getValidateCapacity(selectedCapacityValue)) {
    selectRooms.setCustomValidity('Данное количество комнат не вмещает заданное количество гостей');
    return false;
  } else {
    selectRooms.setCustomValidity('');
    return true;
  }
};


adForm.addEventListener('submit', function (evt) {
  if (!getInvalidRooms()) {
    evt.preventDefault();
  }
});

var changeValue = function () {
  selectedRoomValue = parseInt(selectRooms[selectRooms.options.selectedIndex].value, 10);
  selectedCapacityValue = parseInt(selectCapacity[selectCapacity.options.selectedIndex].value, 10);

  getValidateCapacity(selectedCapacityValue);
  getInvalidRooms();
};

selectCapacity.addEventListener('change', function () {
  changeValue();
});

selectRooms.addEventListener('change', function () {
  changeValue();
});
