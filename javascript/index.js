document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slidesContainer = document.querySelector('.slides');
    const totalSlides = slides.length;
    let slideInterval;

    // Initial position to show the first real slide
    slidesContainer.style.transform = 'translateX(-100%)';

    const showSlide = (index) => {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        const offset = -index * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
    };

    const handleTransitionEnd = () => {
        if (slideIndex === 0) {
            slidesContainer.style.transition = 'none';
            
            slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
            slideIndex = totalSlides - 2; // Move to the last real slide
        } else if (slideIndex === totalSlides - 2) {
            slidesContainer.style.transition = 'none';
            slideIndex = 1; // Move to the first real slide
            slidesContainer.style.transform = `translateX(-100%)`;
        }
    };

    slidesContainer.addEventListener('transitionend', handleTransitionEnd);

    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
            slidesContainer.addEventListener('transitionend', handleTransitionEnd);
        }, 5000); // Change slide every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(slideInterval);
        startAutoSlide();
    };

    prevButton.addEventListener('click', () => {
        slideIndex--;
        showSlide(slideIndex);
        slidesContainer.addEventListener('transitionend', handleTransitionEnd);
        resetAutoSlide(); // Reset the timer when the previous button is clicked
    });

    nextButton.addEventListener('click', () => {
        slideIndex++;
        showSlide(slideIndex);
        slidesContainer.addEventListener('transitionend', handleTransitionEnd);
        resetAutoSlide(); // Reset the timer when the next button is clicked
    });

    // Start the auto-slide functionality initially
    startAutoSlide();


    
});

class Carousel {
    constructor(containerId, intervalTime = 3000) {
        this.carouselContainer = document.getElementById(containerId);
        this.carousel = this.carouselContainer.querySelector('.carousel');
        this.slides = this.carouselContainer.querySelectorAll('.carousel img');
        this.currentIndex = 0;
        this.intervalTime = intervalTime;
        this.startCarousel();
    }

    showSlide(index) {
        this.carousel.style.transition = 'transform 0.5s ease-in-out';
        const offset = -index * 100;
        this.carousel.style.transform= `translateX(${offset}%)`;
        //this.carousel.style.transform = `translateX(${-100 * index}%)`;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
    }

    startCarousel() {
        this.showSlide(this.currentIndex);
        setInterval(() => this.nextSlide(), this.intervalTime);
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('carousel1', 2000);
    new Carousel('carousel2', 2000);
    new Carousel('carousel3', 2000);
    new Carousel('carousel4', 2000);
    new Carousel('carousel5', 3000);
    new Carousel('carousel6', 3000);
    new Carousel('carousel7', 4000);  // Different interval for second carousel if needed
});
