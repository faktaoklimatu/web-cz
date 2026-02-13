$(function () {
  // Carousel functionality
  let currentSlide = 0;
  const $slides = $('.carousel-slide');
  const $dotsContainer = $('.carousel-controls');

  // Generate dots dynamically from slide count
  $slides.each((i) => {
    $dotsContainer.append(
      $('<button>', { class: 'carousel-dot' + (i === 0 ? ' active' : '') })
    );
  });
  const $dots = $dotsContainer.find('.carousel-dot');

  const goToSlide = (n) => {
    $slides.eq(currentSlide).removeClass('active');
    $dots.eq(currentSlide).removeClass('active');
    currentSlide = n;
    $slides.eq(currentSlide).addClass('active');
    $dots.eq(currentSlide).addClass('active');
  };

  $dotsContainer.on('click', '.carousel-dot', function () {
    goToSlide($(this).index());
  });

  // Auto-advance carousel every 3 seconds
  if ($slides.length > 0) {
    setInterval(() => {
      goToSlide((currentSlide + 1) % $slides.length);
    }, 3000);
  }

  // Lightbox functionality
  const $lightbox = $('#lightbox');
  const $lightboxImg = $('#lightbox-img');

  const openLightbox = (imageUrl) => {
    $lightboxImg.attr('src', imageUrl);
    $lightbox.addClass('active');
    $('body').css('overflow', 'hidden');
  };

  const closeLightbox = () => {
    $lightbox.removeClass('active');
    $('body').css('overflow', 'auto');
  };

  $('.carousel-slide img').on('click', function () {
    openLightbox(this.src);
  });

  $('.lightbox, .lightbox-close').on('click', () => {
    closeLightbox();
  });

  // Prevent closing when clicking on the image itself
  $('.lightbox-content').on('click', (e) => {
    e.stopPropagation();
  });

  // Close lightbox with Escape key
  $(document).on('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
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
  $('#download-modal').one('show.bs.modal', function () {
    const newsletterId = this.dataset.newsletterId;
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
  $('.download-trigger').on('click', (e) => {
    e.preventDefault();
    triggerDownload();
    $('#download-modal').modal('show');
  });

  // Testimonial button
  const $section = $(".testimonials-section");
  const $button = $(".testimonials-toggle");

  if (!$section.length || !$button.length) return;

  // Collapsed by default (only first 3 visible via CSS)
  $section.addClass("is-collapsed");

  $button.on("click", function () {
    const isCollapsed = $section.toggleClass("is-collapsed").hasClass("is-collapsed");

    $button.attr("aria-expanded", !isCollapsed ? "true" : "false");
    $button.text(!isCollapsed ? "Skrýt ohlasy" : "Zobrazit všechny ohlasy");
  });
});
