window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navbarconteiner = document.querySelector('.navbar-container');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    navbarconteiner.classList.toggle('scrolled', window.scrollY > 50);
});



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



// Adicione este JavaScript
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

    // Event listeners unificados
    container.addEventListener('touchstart', handleStart);
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('touchend', handleEnd);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mousemove', e => isDragging && e.preventDefault());
});


document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const textosWrapper = document.querySelector('.textos-wrapper');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let slideIndex = 0;
    const totalSlides = 2;

    const moveSlides = () => {
        const translateValue = `-${slideIndex * 50}%`;
        sliderWrapper.style.transform = `translateX(${translateValue})`;
        textosWrapper.style.transform = `translateX(${translateValue})`;
    };

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
