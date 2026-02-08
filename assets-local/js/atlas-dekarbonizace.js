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

  // Download modal
  const PDF_URL = '/assets-local/files/atlas-dekarbonizace-ceska.pdf';

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = PDF_URL;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Load Ecomail widget on first modal open (same pattern as faktaoklimatu.cz newsletter)
  $('#download-modal').one('show.bs.modal', (event) => {
    const newsletterId = event.target.dataset.newsletterId;
    window['ecm-widget'] = 'ecmwidget';
    window['ecmwidget'] = window['ecmwidget'] || function () {
      (window['ecmwidget'].q = window['ecmwidget'].q || []).push(arguments)
    };
    const js = document.createElement('script');
    js.id = newsletterId;
    js.dataset.a = 'faktaoklimatu';
    js.src = 'https://d70shl7vidtft.cloudfront.net/widget.js';
    document.head.appendChild(js);
  });

  // Open modal on download button click — start download immediately + show newsletter popup
  document.querySelectorAll('.download-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerDownload();
      $('#download-modal').modal('show');
    });
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  // Testimonial button
  var section = document.querySelector(".testimonials-section");
  var button = document.querySelector(".testimonials-toggle");

  if (!section || !button) return;

  // Collapsed by default (only first 3 visible via CSS)
  section.classList.add("is-collapsed");

  button.addEventListener("click", function () {
      var isCollapsed = section.classList.toggle("is-collapsed");
      section.classList.toggle("is-collapsed", isCollapsed);

      button.setAttribute("aria-expanded", !isCollapsed ? "true" : "false");
      button.textContent = !isCollapsed ? "Skrýt ohlasy" : "Zobrazit všechny ohlasy";
  });
});
