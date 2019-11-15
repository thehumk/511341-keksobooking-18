'use strict';

(function () {
  var selectedTypeValue = window.dom.selectType[window.dom.selectType.options.selectedIndex].value;

  var selectedRoomValue = parseInt(window.dom.selectRooms[window.dom.selectRooms.options.selectedIndex].value, 10);
  var selectedCapacityValue = parseInt(window.dom.selectCapacity[window.dom.selectCapacity.options.selectedIndex].value, 10);

  var minPriceForType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var capacityRoomsForGuests = {
    0: [100],
    1: [1, 2, 3],
    2: [2, 3],
    3: [3]
  };

  var setMinPrice = function (type) {
    window.dom.inputPrice.setAttribute('min', minPriceForType[type]);
    window.dom.inputPrice.setAttribute('placeholder', minPriceForType[type]);
  };

  var changeType = function () {
    selectedTypeValue = window.dom.selectType[window.dom.selectType.options.selectedIndex].value;
    setMinPrice(selectedTypeValue);
  };

  window.dom.selectType.addEventListener('change', changeType);

  var changeTimeIn = function () {
    window.dom.selectTimeOut.selectedIndex = window.dom.selectTimeIn.selectedIndex;
  };

  var changeTimeOut = function () {
    window.dom.selectTimeIn.selectedIndex = window.dom.selectTimeOut.selectedIndex;
  };

  window.dom.selectTimeIn.addEventListener('change', changeTimeIn);
  window.dom.selectTimeOut.addEventListener('change', changeTimeOut);

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
      window.dom.selectRooms.setCustomValidity('Данное количество комнат не вмещает заданное количество гостей');
      return false;
    } else {
      window.dom.selectRooms.setCustomValidity('');
      return true;
    }
  };

  var changeValue = function () {
    selectedRoomValue = parseInt(window.dom.selectRooms[window.dom.selectRooms.options.selectedIndex].value, 10);
    selectedCapacityValue = parseInt(window.dom.selectCapacity[window.dom.selectCapacity.options.selectedIndex].value, 10);

    getInvalidRooms();
  };

  window.dom.selectCapacity.addEventListener('change', changeValue);

  window.dom.selectRooms.addEventListener('change', changeValue);

  setMinPrice(selectedTypeValue);
  getInvalidRooms();
})();
