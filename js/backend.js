'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  window.load = function (onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status !== SUCCESS_CODE) {
        onError();
      }
    });

    window.xhr = xhr;
  };

  window.load(window.onError);

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
        onSuccessPopup();
      } else {
        onError();
      }
    });
  };

  var onSuccessPopup = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');

    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateSuccess.cloneNode(true));
    document.querySelector('main').appendChild(fragment);

    var successPopup = document.querySelector('.success');

    document.addEventListener('click', function () {
      document.querySelector('main').removeChild(successPopup);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.escKey) {
        document.querySelector('main').removeChild(successPopup);
      }
    });
    document.querySelector('.success__message').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  window.onError = function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');

    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateError.cloneNode(true));
    document.querySelector('main').appendChild(fragment);

    var errorPopup = document.querySelector('.error');

    document.addEventListener('click', function () {
      document.querySelector('main').removeChild(errorPopup);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.escKey) {
        document.querySelector('main').removeChild(errorPopup);
      }
    });
    document.querySelector('.error__message').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };
})();
