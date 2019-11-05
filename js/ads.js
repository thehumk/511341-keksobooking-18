'use strict';

(function () {
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

  var TYPE_REALTY_CARDS = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
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
          price: window.util.getRandomInteger(MIN_PRICE, MAX_PRICE),
          type: TYPE_REALTY[window.util.getRandomInteger(0, TYPE_REALTY.length - 1)],
          rooms: window.util.getRandomInteger(MIN_ROOMS, MAX_ROOMS),
          guests: window.util.getRandomInteger(MIN_GUEST, MAX_GUEST),
          checkin: SIMILAR_CHECKIN[window.util.getRandomInteger(0, SIMILAR_CHECKIN.length - 1)],
          checkout: SIMILAR_CHECKOUT[window.util.getRandomInteger(0, SIMILAR_CHECKOUT.length - 1)],
          features: window.util.createRandomArray(AMENITIES),
          description: 'строка с описанием',
          photos: window.util.createRandomArray(PHOTOS)
        },

        location: {
          x: window.util.getRandomInteger(MIN_COORDINATE_X, MAX_COORDINATE_X),
          y: window.util.getRandomInteger(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
        }
      };

      nearbyAds[i].offer.address = nearbyAds[i].location.x + ', ' + nearbyAds[i].location.y;
    }
  };

  var createPinsAds = function (ads) {
    var similarPin = window.dom.templatePin.cloneNode(true);

    similarPin.classList.add('map__pin--secondary');
    similarPin.style.left = ads.location.x + LOCATION_ADJUSTMENT_X + 'px';
    similarPin.style.top = ads.location.y + LOCATION_ADJUSTMENT_Y + 'px';
    similarPin.querySelector('img').src = ads.author.avatar;
    similarPin.querySelector('img').alt = ads.offer.title;

    return similarPin;
  };

  var createCardsAds = function (ads) {
    var cardAd = window.dom.templateCard.cloneNode(true);

    cardAd.style.display = 'none';

    cardAd.querySelector('.popup__title').textContent = ads.offer.title;
    cardAd.querySelector('.popup__text--address').textContent = ads.offer.address;
    cardAd.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    cardAd.querySelector('.popup__type').textContent = TYPE_REALTY_CARDS[ads.offer.type];
    cardAd.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    cardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    cardAd.querySelector('.popup__description').textContent = ads.offer.description;
    cardAd.querySelector('.popup__avatar').src = ads.author.avatar;

    var addFeatures = function () {
      cardAd.querySelector('.popup__features').innerHTML = '';

      for (var i = 0; i < ads.offer.features.length; i++) {
        var listItemFeatures = document.createElement('li');
        listItemFeatures.classList.add('popup__feature');
        listItemFeatures.classList.add('popup__feature--' + ads.offer.features[i]);
        cardAd.querySelector('.popup__features').appendChild(listItemFeatures);
      }
    };

    var addPhotos = function () {
      cardAd.querySelector('.popup__photos').innerHTML = '';

      for (var i = 0; i < ads.offer.photos.length; i++) {
        var imgPhotos = document.createElement('img');
        imgPhotos.classList.add('popup__photo');
        imgPhotos.setAttribute('alt', 'Фотография жилья');
        imgPhotos.setAttribute('width', '45');
        imgPhotos.setAttribute('height', '40');
        imgPhotos.setAttribute('src', ads.offer.photos[i]);

        cardAd.querySelector('.popup__photos').appendChild(imgPhotos);
      }
    };

    addFeatures();
    addPhotos();

    return cardAd;
  };

  var renderPinAd = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < nearbyAds.length; i++) {
      fragment.appendChild(createPinsAds(nearbyAds[i]));
    }

    window.dom.similarAd.appendChild(fragment);
  };

  var renderCardAd = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < nearbyAds.length; i++) {
      fragment.appendChild(createCardsAds(nearbyAds[i]));
    }

    window.dom.map.appendChild(fragment);
  };

  var openCardsAds = function () {
    var cardsAds = document.querySelectorAll('.map__card');
    var pinsAds = document.querySelectorAll('.map__pin--secondary');

    pinsAds.forEach(function (elem, i) {
      elem.addEventListener('click', function () {
        cardsAds[i].style.display = 'block';
      });
      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEYCODE.ENTER_KEY) {
          cardsAds[i].style.display = 'block';
        }
      });
    });

    cardsAds.forEach(function (elem) {
      elem.addEventListener('click', function () {
        elem.style.display = 'none';
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEYCODE.ESC_KEY) {
          elem.style.display = 'none';
        }
      });
    });
  };

  createSimilarAds();

  window.ads = {
    renderPinAd: renderPinAd,
    renderCardAd: renderCardAd,
    openCardsAds: openCardsAds
  };
})();
