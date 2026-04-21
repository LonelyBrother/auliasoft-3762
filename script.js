// Smooth scroll tambahan (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// navbar berubah saat scroll
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// active link saat scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
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

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

const images = document.querySelectorAll(".stack-img");

function rotateStack() {
  images.forEach((img) => {
    if (img.classList.contains("stack-front")) {
      img.classList.remove("stack-front");
      img.classList.add("stack-back");
    } 
    else if (img.classList.contains("stack-middle")) {
      img.classList.remove("stack-middle");
      img.classList.add("stack-front");
    } 
    else if (img.classList.contains("stack-back")) {
      img.classList.remove("stack-back");
      img.classList.add("stack-middle");
    }
  });
}

// loop tiap 3 detik
setInterval(rotateStack, 3000);

const carousel = document.querySelector('#heroCarousel');

if (carousel) {
  new bootstrap.Carousel(carousel, {
    interval: 2500,
    ride: 'carousel',
    pause: false, // tetap jalan walau disentuh
    touch: true,
    wrap: true
  });
}

function toggleFeature(el) {
  const isActive = el.classList.contains("active");

  // tutup semua dulu (biar cuma 1 kebuka)
  document.querySelectorAll(".feature-card").forEach(card => {
    card.classList.remove("active");
  });

  // buka kalau sebelumnya belum aktif
  if (!isActive) {
    el.classList.add("active");
  }
}

new Swiper(".mySwiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 30,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 }
  }
});