document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.arrow.left');
    const nextButton = document.querySelector('.arrow.right');
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    let currentSlide = 0;
  
    function updateCarousel() {
        const slideWidth = slides.children[0].offsetWidth;
        slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
        updateCarousel();
    });
  
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop back to the last slide
        updateCarousel();
    });
  });