// Theme Initialization
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle Logic
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Account for sticky header height
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission goes via Formspree native action now.
  
  // Lightbox Functionality (Enhanced Gallery)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
  const currentIndexEl = document.getElementById('current-index');
  const totalCountEl = document.getElementById('total-count');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const projectCards = document.querySelectorAll('.project-card');

  let currentScreenshots = [];
  let currentImgIndex = 0;
  let currentProjectTitle = "";

  const updateLightboxImage = (index) => {
    currentImgIndex = index;
    const screenshot = currentScreenshots[currentImgIndex];
    
    // Smooth transition effect
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      lightboxImg.src = screenshot;
      lightboxCaption.textContent = `${currentProjectTitle} - Screen ${currentImgIndex + 1}`;
      currentIndexEl.textContent = currentImgIndex + 1;
      
      // Update thumbnails
      const thumbs = document.querySelectorAll('.thumb-item');
      thumbs.forEach((t, i) => {
        if (i === currentImgIndex) t.classList.add('active');
        else t.classList.remove('active');
      });
      
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 200);
  };

  const openLightbox = (projectCard) => {
    const screenshotsJson = projectCard.getAttribute('data-screenshots');
    currentProjectTitle = projectCard.querySelector('.project-title').textContent;
    
    if (screenshotsJson) {
      currentScreenshots = JSON.parse(screenshotsJson);
    } else {
      const singleImg = projectCard.querySelector('.project-screenshot').src;
      currentScreenshots = [singleImg];
    }
    
    totalCountEl.textContent = currentScreenshots.length;
    
    // Hide nav if only one image
    if (currentScreenshots.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      lightboxThumbnails.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      lightboxThumbnails.style.display = 'flex';
      
      // Clear and build thumbnails
      lightboxThumbnails.innerHTML = '';
      currentScreenshots.forEach((src, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb-item';
        thumb.innerHTML = `<img src="${src}" alt="Thumb ${index + 1}">`;
        thumb.addEventListener('click', () => updateLightboxImage(index));
        lightboxThumbnails.appendChild(thumb);
      });
    }
    
    updateLightboxImage(0);
    lightbox.style.display = 'block';
    setTimeout(() => lightbox.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  };

  if (lightbox && projectCards.length > 0) {
    projectCards.forEach(card => {
      const imgContainer = card.querySelector('.project-img');
      imgContainer.addEventListener('click', () => openLightbox(card));
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 400);
    };

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let newIndex = currentImgIndex - 1;
      if (newIndex < 0) newIndex = currentScreenshots.length - 1;
      updateLightboxImage(newIndex);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let newIndex = currentImgIndex + 1;
      if (newIndex >= currentScreenshots.length) newIndex = 0;
      updateLightboxImage(newIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (currentScreenshots.length > 1) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      }
    });
  }
});
