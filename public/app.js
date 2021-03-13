const burger = document.querySelector('.burger');
const menu = document.querySelector('.slideout');
const dark = document.querySelector('.dark');
const menuButtons = document.querySelectorAll('.btn-menu');
const line = document.querySelector('.line');
const viewWidth = window.innerWidth;


function toggleMenu(e){
  if (window.innerWidth <= 768) {
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