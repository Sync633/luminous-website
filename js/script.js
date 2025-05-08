// ------------ Animação da NAVBAR ------------ //

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navbarconteiner = document.querySelector('.navbar-container');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    navbarconteiner.classList.toggle('scrolled', window.scrollY > 50);
});



// ------------ Carrossel da Seção SOBRE O LUNA ------------ //
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.carrossel-card');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'next');
            
            if(index === currentIndex) {
                card.classList.add('active');
            }
            else if(index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    nextBtn.addEventListener('click', nextSlide);
    updateCards();
});



// ------------ Carrossel da Seção TDAH ------------ //
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.tdah-carrossel-conteiner');
    const slides = document.querySelectorAll('.tdah-cards');
    let startX = 0, currentIndex = 0, isDragging = false;
    const slideWidth = slides[0].offsetWidth + 30;

    container.style.width = `${slideWidth * slides.length}px`;

    const handleStart = (e) => {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging = true;
    };

    const handleEnd = (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const deltaX = endX - startX;
        
        if (Math.abs(deltaX) > 50) {
            currentIndex += deltaX > 0 ? -1 : 1;
            updateCarousel();
        }
        isDragging = false;
    };

    const updateCarousel = () => {
        container.style.transition = 'transform 0.5s ease';
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        container.addEventListener('transitionend', () => {
            if (currentIndex >= slides.length / 2 || currentIndex < 0) {
                currentIndex = currentIndex < 0 ? slides.length / 2 - 1 : 0;
                container.style.transition = 'none';
                container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }
        }, {once: true});
    };

    container.addEventListener('touchstart', handleStart);
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('touchend', handleEnd);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mousemove', e => isDragging && e.preventDefault());
});



// ------------ Carrossel da Seção HIPERFOCO ------------ //
document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const textosWrapper = document.querySelector('.textos-wrapper');
    const prevButton = document.querySelector('.anterior');
    const nextButton = document.querySelector('.proximo');
    let slideIndex = 0;
    const totalSlides = 2;
  
    const updateButtons = () => {
      prevButton.disabled = slideIndex === 0;
      nextButton.disabled = slideIndex === totalSlides - 1;
    };
  
    const moveSlides = () => {
      const translateValue = `-${slideIndex * 50}%`; 
      sliderWrapper.style.transform = `translateX(${translateValue})`;
      textosWrapper.style.transform = `translateX(${translateValue})`;
      updateButtons();
    };
  
    // Inicializa estado dos botões
    updateButtons();
  
    prevButton.addEventListener('click', () => {
      if (slideIndex > 0) {
        slideIndex--;
        moveSlides();
      }
    });
  
    nextButton.addEventListener('click', () => {
      if (slideIndex < totalSlides - 1) {
        slideIndex++;
        moveSlides();
      }
    });
});


// ------------ MENU HAMBURGER MOBILE ------------ //
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
}
const mobileNavbar = new MobileNavbar(
    ".menu-mobile",
    ".nav-menu",
    ".nav-menu li",
);
mobileNavbar.init();