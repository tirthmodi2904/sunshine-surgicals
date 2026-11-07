
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile navigation
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');

  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

// Reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// =========================
// PRODUCT IMAGE LIGHTBOX
// =========================

const productImages = document.querySelectorAll('.gallery-card img');
const productLightbox = document.getElementById('productLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

productImages.forEach(image => {
  image.addEventListener('click', () => {
    productLightbox.classList.add('active');

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    const productName = image.closest('.gallery-card').querySelector('h3').textContent;
    lightboxCaption.textContent = productName;

    document.body.style.overflow = 'hidden';
  });
});

// Close button
lightboxClose.addEventListener('click', () => {
  productLightbox.classList.remove('active');
  document.body.style.overflow = '';
});

// Close when clicking outside the image
productLightbox.addEventListener('click', event => {
  if (event.target === productLightbox) {
    productLightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close with Escape key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    productLightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});