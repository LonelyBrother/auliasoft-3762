document.addEventListener("DOMContentLoaded", function () {

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    // smooth scroll
    target.scrollIntoView({
      behavior: "smooth"
    });

    // AUTO CLOSE MOBILE NAVBAR
    const navMenu = document.querySelector(".navbar-collapse");

    if (navMenu.classList.contains("show")) {

      const bsCollapse =
        bootstrap.Collapse.getInstance(navMenu);

      if (bsCollapse) {
        bsCollapse.hide();
      }

    }

  });

});

  // ================= NAVBAR =================
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
      navbar.classList.toggle("shrink", window.scrollY > 50);
    });
  }

  // ================= ACTIVE LINK =================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }

  // ================= REVEAL =================
  function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  // ================= HERO STACK =================
  const images = document.querySelectorAll(".stack-img");

  if (images.length) {
    setInterval(() => {
      images.forEach(img => {
        if (img.classList.contains("stack-front")) {
          img.classList.replace("stack-front", "stack-back");
        } else if (img.classList.contains("stack-middle")) {
          img.classList.replace("stack-middle", "stack-front");
        } else if (img.classList.contains("stack-back")) {
          img.classList.replace("stack-back", "stack-middle");
        }
      });
    }, 3000);
  }

  // ================= CAROUSEL =================
  const carousel = document.querySelector('#heroCarousel');
  if (carousel && typeof bootstrap !== "undefined") {
    new bootstrap.Carousel(carousel, {
      interval: 2500,
      ride: 'carousel',
      pause: false
    });
  }

  // ================= SWIPER =================
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 500,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 }
      }
    });
  }

  // ================= PRICING =================
  const monthlyBtn = document.getElementById("monthlyBtn");
  const yearlyBtn = document.getElementById("yearlyBtn");
  const prices = document.querySelectorAll(".price");
  const billingText = document.querySelectorAll(".billing-text");
  const buttons = document.querySelectorAll('.btn-pilih');

  let isYearly = false;

  function formatRupiah(num) {
    return "Rp " + Number(num).toLocaleString("id-ID");
  }

  if (monthlyBtn && yearlyBtn) {

    monthlyBtn.addEventListener("click", () => {
      isYearly = false;

      monthlyBtn.classList.add("active");
      yearlyBtn.classList.remove("active");

      prices.forEach(p => {
        p.innerText = formatRupiah(p.dataset.monthly);
      });

      billingText.forEach(t => t.innerText = "/ bulan");
    });

    yearlyBtn.addEventListener("click", () => {
      isYearly = true;

      yearlyBtn.classList.add("active");
      monthlyBtn.classList.remove("active");

      prices.forEach(p => {
        p.innerText = formatRupiah(p.dataset.yearly);
      });

      billingText.forEach(t => t.innerText = "/ tahun");
    });
  }

  // ================= MODAL =================
  const modalEl = document.getElementById('paymentModal');

  if (modalEl && buttons.length) {

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {

        const paket = btn.dataset.paket;
        const harga = isYearly ? btn.dataset.yearly : btn.dataset.monthly;

        const formatted = formatRupiah(harga);
        const tipe = isYearly ? "tahunan" : "bulanan";

        document.getElementById('paymentPrice').innerText = formatted;

        const waText = `Halo, saya ingin berlangganan paket ${paket} (${tipe}) AuliaSoft POS dengan harga ${formatted}`;
        document.getElementById('waBtn').href =
          `https://wa.me/6281241945881?text=${encodeURIComponent(waText)}`;

        modal.show();
      });
    });

    // fix backdrop bug
    modalEl.addEventListener('hidden.bs.modal', () => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style = '';
    });
  }

  // ================= FEATURE =================
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      featureCards.forEach(c => {
        c.classList.remove('active', 'dim');
      });

      if (!isActive) {
        card.classList.add('active');
        featureCards.forEach(c => {
          if (c !== card) c.classList.add('dim');
        });
      }
    });
  });

});
