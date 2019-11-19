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

    var onClosePopup = function () {
      document.querySelector('main').removeChild(successPopup);
      document.removeEventListener('click', onClosePopup);
      document.removeEventListener('keydown', onClosePopupKeydown);
    };

    var onClosePopupKeydown = function (evt) {
      if (evt.keyCode === window.util.KEYCODE.escKey) {
        document.querySelector('main').removeChild(successPopup);
        document.removeEventListener('click', onClosePopup);
        document.removeEventListener('keydown', onClosePopupKeydown);
      }
    };

    document.addEventListener('click', onClosePopup);
    document.addEventListener('keydown', onClosePopupKeydown);
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

    var onCloseError = function () {
      document.querySelector('main').removeChild(errorPopup);
      document.removeEventListener('click', onCloseError);
      document.removeEventListener('keydown', onCloseErrorKeydown);
    };

    var onCloseErrorKeydown = function (evt) {
      if (evt.keyCode === window.util.KEYCODE.escKey) {
        document.querySelector('main').removeChild(errorPopup);
        document.removeEventListener('click', onCloseError);
        document.removeEventListener('keydown', onCloseErrorKeydown);
      }
    };

    document.addEventListener('click', onCloseError);
    document.addEventListener('keydown', onCloseErrorKeydown);
    document.querySelector('.error__message').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  window.load(window.onError);
})();
