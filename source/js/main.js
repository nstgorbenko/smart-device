'use strict';

var PHONE_MASK = {
  mask: '+{7}(000)000-00-00'
};

var phoneCall = document.querySelector('.main-header__button');
var overlay = document.querySelector('.overlay');

var popup = document.querySelector('.call');
var popupCloser = popup.querySelector('.call__close');
var popupForm = popup.querySelector('.call__letter');
var popupName = popup.querySelector('[name=popup-name]');
var popupPhone = popup.querySelector('[name=popup-phone]');
var popupMessage = popup.querySelector('[name=popup-message]');

var phone = document.querySelector('[name=phone]');

var navList = document.querySelector('.dropdown__checkbox-nav');
var contactsList = document.querySelector('.dropdown__checkbox-contacts');

var isStorageSupport = true;
var popupNameStorage = '';
var popupPhoneStorage = '';
var popupMessageStorage = '';

var setMask = function (phoneInput) {
  IMask(phoneInput, PHONE_MASK);
};

var openPopup = function () {
  popup.classList.add('call__show');
  overlay.classList.add('overlay__show');
  popupName.focus();
  document.body.style.overflow = 'hidden';
};

var closePopup = function () {
  popup.classList.remove('call__show');
  popup.classList.remove('call__error');
  overlay.classList.remove('overlay__show');
  document.body.style.overflow = 'visible';
};

var onDropdownToggleClick = function (evt) {
  if (evt.target === navList) {
    contactsList.checked = false;
  } else {
    navList.checked = false;
  }
};

navList.addEventListener('change', onDropdownToggleClick);
contactsList.addEventListener('change', onDropdownToggleClick);

setMask(phone, PHONE_MASK);
setMask(popupPhone, PHONE_MASK);

try {
  popupNameStorage = localStorage.getItem('popupName');
  popupPhoneStorage = localStorage.getItem('popupPhone');
  popupMessageStorage = localStorage.getItem('popupMessage');
} catch (err) {
  isStorageSupport = false;
}

phoneCall.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();

  if (popupNameStorage) {
    popupName.value = popupNameStorage;
    popupPhone.value = popupPhoneStorage;
    popupMessage.value = popupMessageStorage;
  }
});

popupCloser.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

overlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('call__show')) {
      closePopup();
    }
  }
});

popupForm.addEventListener('submit', function (evt) {
  if (!popupName.value || !popupPhone.value || !popupMessage.value) {
    evt.preventDefault();
    popup.classList.remove('call__error');
    popup.width = popup.offsetWidth;
    popup.classList.add('call__error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('popupName', popupName.value);
      localStorage.setItem('popupPhone', popupPhone.value);
      localStorage.setItem('popupMessage', popupMessage.value);
    }
  }
});


