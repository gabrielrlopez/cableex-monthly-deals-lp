'use strict';

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header')
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');


/*********************************************************************/
//Nav bar opacity effect (blur-effect)

//Menu fade animation 
//Event delegation 

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => { if (el !== link) el.style.opacity = this });
        logo.style.opacity = this;
    }
}


nav.addEventListener('mouseover', handleHover.bind(.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/*********************************************************************/
// Modal window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

/*********************************************************************/
//Page scrolling 

// Event Delagtion to add event listener to all navigation links 
//Navigation scrolling
//1. Add event listener to common parent element
//2. Determine what element originated the event 
document.querySelector('.nav__links').addEventListener('click', function (e) {
    //Matching strategy 
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})

/********************************************************************/
//Section reveal 
const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: .15
})

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})

/********************************************************************/
//Tabs feature 

//Tabbed component 
// Event Delagtion to add event listener to all tabs 
//1. Add event listener to common parent element
//2. Determine what element originated the event 

tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');

    //Guard clause 
    if (!clicked) return;

    //Activate & remove tab 
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    //Activate & remove content area 
    tabContent.forEach(content => content.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});

/***********************************************************************/
//Hamburger menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    nav.classList.toggle('show');
});