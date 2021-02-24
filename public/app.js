const burger = document.querySelector('.burger');
const menu = document.querySelector('.slideout');
const dark = document.querySelector('.dark');
const menuButtons = document.querySelectorAll('.btn-menu');
const line = document.querySelector('.line');

function toggleMenu(e){
    if (burger.classList.contains('open') || menu.classList.contains('.menu-out')){
    burger.classList.remove('open');
    menu.classList.remove('menu-out');
    dark.classList.remove('menu-out');
    line.classList.remove('line-active');
    } else {
        burger.classList.add('open');
        menu.classList.add('menu-out');
        dark.classList.add('menu-out');
        line.classList.add('line-active');
        }
}

burger.addEventListener('click', toggleMenu);
menuButtons.forEach(Element => {
    Element.addEventListener('click', toggleMenu);
});
dark.addEventListener('click', toggleMenu);