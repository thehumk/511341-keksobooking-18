'use strict';

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.round(randomNumber);
};

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

renderFragmentElement();
