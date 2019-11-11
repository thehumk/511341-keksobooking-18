'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        onError();
      }
    });

    window.xhr = xhr;
  };

  window.load(function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');

    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateError.cloneNode(true));
    document.querySelector('main').appendChild(fragment);
  });
})();
