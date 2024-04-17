let navList = document.querySelector('.nav__list');
let navButton = document.querySelector('.button-toggle');

// navList.classList.remove('navigation__list--no-js');
// navButton.classList.remove('navigation__button--no-js');

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
