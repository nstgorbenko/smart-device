'use strict';

var link = document.querySelector('.main-header__button');
var overlay = document.querySelector('.overlay');
var popup = document.querySelector('.call');
var close = popup.querySelector('.call__close');
var form = popup.querySelector('.call__letter');
var fio = popup.querySelector('[name=name]');
var tel = popup.querySelector('[name=tel]');
var message = popup.querySelector('[name=message]');
var navList = document.querySelector('.dropdown__checkbox-nav');
var contactsList = document.querySelector('.dropdown__checkbox-contacts');
var isStorageSupport = true;
var nameStorage = '';
var telStorage = '';
var messageStorage = '';

var closePopup = function () {
  popup.classList.remove('call__show');
  popup.classList.remove('call__error');
  overlay.classList.remove('overlay__show');
  document.body.style.overflow = 'visible';
};

var openPopup = function () {
  popup.classList.add('call__show');
  overlay.classList.add('overlay__show');
  fio.focus();
  document.body.style.overflow = 'hidden';
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

try {
  nameStorage = localStorage.getItem('fio');
  telStorage = localStorage.getItem('tel');
  messageStorage = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();

  if (nameStorage) {
    fio.value = nameStorage;
    tel.value = telStorage;
    message.value = messageStorage;
  }
});

close.addEventListener('click', function (evt) {
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

form.addEventListener('submit', function (evt) {
  if (!fio.value || !tel.value || !message.value) {
    evt.preventDefault();
    popup.classList.remove('call__error');
    popup.width = popup.offsetWidth;
    popup.classList.add('call__error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', fio.value);
      localStorage.setItem('tel', tel.value);
      localStorage.setItem('message', message.value);
    }
  }
});
