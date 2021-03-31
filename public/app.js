const burger = document.querySelector('.burger');
const menu = document.querySelector('.slideout');
const dark = document.querySelector('.dark');
const menuButtons = document.querySelectorAll('.btn-menu');
const line = document.querySelector('.line');
const viewWidth = window.innerWidth;
const subForm = document.querySelector('.form-appt');
const popUp = document.querySelector('.popup');
const popUpBtn = document.querySelector('.btn-thankyou2');
const datePicker = document.querySelector('.calendar');

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBKI_bxndw-had46uu4N_YYe4Zo7rZ348Y',
  authDomain: 'dentistry-7a55b.firebaseapp.com',
  projectId: 'dentistry-7a55b',
  storageBucket: 'dentistry-7a55b.appspot.com',
  messagingSenderId: '633876959193',
  appId: '1:633876959193:web:f581a97f03424de981d3c8',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Date picker

const currentDate = new Date().toISOString().slice(0, 10);
datePicker.setAttribute('min', currentDate);

// Menu logic

function toggleMenu(e) {
  if (window.innerWidth < 768) {
    if (burger.classList.contains('open') || menu.classList.contains('.menu-out')) {
      burger.classList.remove('open');
      menu.classList.remove('menu-out');
      dark.classList.remove('menu-out');
      line.classList.remove('line-active');
      document.body.style.overflow = '';
    } else {
      burger.classList.add('open');
      menu.classList.add('menu-out');
      dark.classList.add('menu-out');
      line.classList.add('line-active');
      document.body.style.overflow = 'hidden';
    }
  } else {

  }
}

burger.addEventListener('click', toggleMenu);
menuButtons.forEach((Element) => {
  Element.addEventListener('click', toggleMenu);
});
dark.addEventListener('click', toggleMenu);

// Watch window width and close the menu if it is open

window.addEventListener('resize', menuClose);
function menuClose() {
  if (burger.classList.contains('open') || menu.classList.contains('.menu-out')) {
    burger.classList.remove('open');
    menu.classList.remove('menu-out');
    dark.classList.remove('menu-out');
    line.classList.remove('line-active');
    document.body.style.overflow = '';
  } else {

  }
}

// Create a database record

const dbRef = db.collection('apptrq');
subForm.addEventListener('submit', formSub);

function formSub(e) {
  e.preventDefault();
  const { serverTimestamp } = firebase.firestore.FieldValue;
  dbRef.add({
    name: document.querySelector('.input-name').value,
    date: document.querySelector('.calendar').value,
    phone: document.querySelector('.phone-input').value,
    ins: document.querySelector('#select-insurance').value,
    submittedOn: serverTimestamp(),
  });
  popUp.classList.add('showpopup');
  subForm.reset();
}

// Close thank you popup

popUpBtn.addEventListener('click', closePopup);
function closePopup(e) {
  popUp.classList.remove('showpopup');
}

// Scroll to top button

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const target = document.querySelector('.cool-image');
function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Show button
      scrollToTopBtn.classList.remove('showBtn');
    } else {
      // Hide button
      scrollToTopBtn.classList.add('showBtn');
    }
  });
}
const observer = new IntersectionObserver(callback);
observer.observe(target);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
scrollToTopBtn.addEventListener('click', scrollToTop);
