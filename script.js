// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ================= NAVBAR =================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  navbar.classList.toggle("shrink", window.scrollY > 50);
});

// ================= ACTIVE LINK =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= REVEAL ANIMATION =================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// ================= HERO STACK =================
const images = document.querySelectorAll(".stack-img");

function rotateStack() {
  images.forEach(img => {
    if (img.classList.contains("stack-front")) {
      img.classList.replace("stack-front", "stack-back");
    } else if (img.classList.contains("stack-middle")) {
      img.classList.replace("stack-middle", "stack-front");
    } else if (img.classList.contains("stack-back")) {
      img.classList.replace("stack-back", "stack-middle");
    }
  });
}

setInterval(rotateStack, 3000);

// ================= HERO CAROUSEL =================
const carousel = document.querySelector('#heroCarousel');

if (carousel) {
  new bootstrap.Carousel(carousel, {
    interval: 2500,
    ride: 'carousel',
    pause: false,
    touch: true,
    wrap: true
  });
}

// ================= SWIPER TESTIMONI =================
const swiper = new Swiper(".mySwiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 30,

  speed: 500, // ⬅️ normal smooth (bukan jalan terus)

  autoplay: {
    delay: 2500, // ⬅️ kasih jeda biar center kebaca
    disableOnInteraction: false,
  },

  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 }
  },

  // 🔥 penting buat stabil center
  watchSlidesProgress: true,
  slideToClickedSlide: true
});

// ================= PRICING COLLAPSE =================
document.querySelectorAll('.toggle-btn').forEach(btn => {
  const target = document.querySelector(btn.getAttribute('data-bs-target'));

  if (!target) return;

  target.addEventListener('show.bs.collapse', () => {
    btn.innerText = "Sembunyikan";
  });

  target.addEventListener('hide.bs.collapse', () => {
    btn.innerText = "Lihat Selengkapnya";
  });
});

// ================= FEATURE EXPAND =================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
  card.addEventListener('click', () => {

    const isActive = card.classList.contains('active');

    // reset semua
    featureCards.forEach(c => {
      c.classList.remove('active');
      c.classList.remove('dim');
    });

    // kalau belum aktif → aktifkan
    if (!isActive) {
      card.classList.add('active');

      // dim card lain
      featureCards.forEach(c => {
        if (c !== card) {
          c.classList.add('dim');
        }
      });
    }
  });
});