const burger = document.querySelector('.burger');
const menu = document.querySelector('.slideout');
const dark = document.querySelector('.dark');
const menuButtons = document.querySelectorAll('.btn-menu');
const line = document.querySelector('.line');
const viewWidth = window.innerWidth;
const subForm = document.querySelector('.form-appt');

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAc1Z_BUV2UQ9a5ZtpUyiBptaXN1elnwxI",
  authDomain: "dentistry-70241.firebaseapp.com",
  projectId: "dentistry-70241",
  storageBucket: "dentistry-70241.appspot.com",
  messagingSenderId: "1049850525458",
  appId: "1:1049850525458:web:18476e32b901134e2865cb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Menu logic

function toggleMenu(e){
  if (window.innerWidth < 768) {
  if (burger.classList.contains('open') || menu.classList.contains('.menu-out')){
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
        document.body.style.overflow = "hidden";
        }
      } else {
        return;
      }
}

burger.addEventListener('click', toggleMenu);
menuButtons.forEach(Element => {
    Element.addEventListener('click', toggleMenu);
});
dark.addEventListener('click', toggleMenu);

// Watch window width and close the menu if it is open

window.addEventListener('resize', menuClose);
function menuClose() {
  if (burger.classList.contains('open') || menu.classList.contains('.menu-out')){
    burger.classList.remove('open');
    menu.classList.remove('menu-out');
    dark.classList.remove('menu-out');
    line.classList.remove('line-active');
    document.body.style.overflow = '';
    } else {
      return;
    }
}

// Create a database record

let dbRef = db.collection('apptrq');
subForm.addEventListener('submit', formSub);

function formSub(e) {
  e.preventDefault();
  const {serverTimestamp} = firebase.firestore.FieldValue;
  dbRef.add({
    name: document.querySelector('.input-name').value,
    date: document.querySelector('.calendar').value,
    ins: document.querySelector('#select-insurance').value,
    submittedOn: serverTimestamp()
  });
  subForm.reset();
}

// Scroll to top button
let scrollToTopBtn = document.getElementById('scrollToTopBtn');
let target = document.querySelector('.cool-image');
function callback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Show button
        scrollToTopBtn.classList.remove('showBtn');
      } else {
        // Hide button
        scrollToTopBtn.classList.add('showBtn');
      }
    });
  }
  let observer = new IntersectionObserver(callback);
  observer.observe(target);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);