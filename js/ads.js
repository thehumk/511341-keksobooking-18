'use strict';

(function () {
  var LOCATION_ADJUSTMENT_X = -25;
  var LOCATION_ADJUSTMENT_Y = -70;
  var QUANTITY_ELEMENTS = 5;

  var typeRealtyCard = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createPins = function (ads) {
    var similarPin = window.dom.templatePin.cloneNode(true);

    similarPin.classList.add('map__pin--secondary');
    similarPin.style.left = ads.location.x + LOCATION_ADJUSTMENT_X + 'px';
    similarPin.style.top = ads.location.y + LOCATION_ADJUSTMENT_Y + 'px';
    similarPin.querySelector('img').src = ads.author.avatar;
    similarPin.querySelector('img').alt = ads.offer.title;

    return similarPin;
  };

  var createCards = function (ads) {
    var cardAd = window.dom.templateCard.cloneNode(true);

    cardAd.querySelector('.popup__title').textContent = ads.offer.title;
    cardAd.querySelector('.popup__text--address').textContent = ads.offer.address;
    cardAd.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    cardAd.querySelector('.popup__type').textContent = typeRealtyCard[ads.offer.type];
    cardAd.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    cardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    cardAd.querySelector('.popup__description').textContent = ads.offer.description;
    cardAd.querySelector('.popup__avatar').src = ads.author.avatar;

    var addFeatures = function () {
      cardAd.querySelector('.popup__features').innerHTML = '';

      ads.offer.features.forEach(function (item) {
        var listItemFeatures = document.createElement('li');
        listItemFeatures.classList.add('popup__feature');
        listItemFeatures.classList.add('popup__feature--' + item);
        cardAd.querySelector('.popup__features').appendChild(listItemFeatures);
      });
    };

    var addPhotos = function () {
      cardAd.querySelector('.popup__photos').innerHTML = '';

      ads.offer.photos.forEach(function (item) {
        var imgPhotos = document.createElement('img');
        imgPhotos.classList.add('popup__photo');
        imgPhotos.setAttribute('alt', 'Фотография жилья');
        imgPhotos.setAttribute('width', '45');
        imgPhotos.setAttribute('height', '40');
        imgPhotos.setAttribute('src', item);

        cardAd.querySelector('.popup__photos').appendChild(imgPhotos);
      });
    };

    addFeatures();
    addPhotos();

    return cardAd;
  };

  var renderData = function (target) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_ELEMENTS; i++) {
      fragment.appendChild(target(window.xhr.response[i]));
    }

    window.dom.similarAd.appendChild(fragment);
  };

  var toggleCards = function () {
    var cardsAds = document.querySelectorAll('.map__card');
    var pinsAds = document.querySelectorAll('.map__pin--secondary');

    var closeAllCards = function () {
      cardsAds.forEach(function (elem, i) {
        elem.style.display = 'none';
        pinsAds[i].classList.remove('map__pin--active');
      });
    };

    pinsAds.forEach(function (elem, i) {
      elem.addEventListener('click', function () {
        closeAllCards();
        cardsAds[i].style.display = 'block';
        elem.classList.add('map__pin--active');
      });
      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEYCODE.enter) {
          closeAllCards();
          cardsAds[i].style.display = 'block';
          elem.classList.add('map__pin--active');
        }
      });
    });

    cardsAds.forEach(function (elem, i) {
      var buttonClose = elem.querySelector('.popup__close');
      buttonClose.addEventListener('click', function () {
        elem.style.display = 'none';
        pinsAds[i].classList.remove('map__pin--active');
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEYCODE.esc) {
          elem.style.display = 'none';
          pinsAds[i].classList.remove('map__pin--active');
        }
      });
    });

    closeAllCards();
  };

  var removeData = function () {
    var similarAds = document.querySelectorAll('.map__pin--secondary');
    var cardSimilarAds = document.querySelectorAll('.map__card');

    similarAds.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    cardSimilarAds.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  window.ads = {
    renderData: renderData,
    toggleCards: toggleCards,
    removeData: removeData,
    createPins: createPins,
    createCards: createCards,
    QUANTITY_ELEMENTS: QUANTITY_ELEMENTS
  };
})();
