document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');

  const goToSlide = (n) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  $('.carousel-dot').click((event) => {
    goToSlide($(event.target).index());
  });

  // Auto-advance carousel every 3 seconds.
  setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 3000);

  // Lightbox functionality
  const openLightbox = (image_url) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = image_url;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  $('.carousel-slide img').click((event) => {
    openLightbox(event.target.src);
  });

  $('.lightbox, .lightbox-close').click((event) => {
    event.stopPropagation();
    closeLightbox();
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
});
