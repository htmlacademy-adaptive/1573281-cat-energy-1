let navList = document.querySelector('.nav__list');
let navButton = document.querySelector('.button-toggle');
let headerWrapper = document.querySelector('.header__wrapper');
let logo = document.querySelector('.logo');

logo.classList.remove('logo--nojs')
headerWrapper.classList.remove('header__wrapper--nojs')
headerWrapper.classList.add('container')
navList.classList.remove('nav__list--nojs');
navList.classList.add('nav__list--hidden');
navButton.classList.add('button-toggle--closed');

navButton.addEventListener('click', function () {
  if (navList.classList.contains('nav__list--hidden')) {
    navList.classList.remove('nav__list--hidden');
    navButton.classList.remove('button-toggle--closed');
    navButton.classList.add('button-toggle--opened');
  } else {
    navList.classList.add('nav__list--hidden');
    navButton.classList.add('button-toggle--closed');
    navButton.classList.remove('button-toggle--opened');
  }
});
