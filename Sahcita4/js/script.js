// ANIMASI
// Fungsi untuk menambahkan class 'active' saat masuk ke viewport
function animateOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-up");
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

// Jalankan saat halaman selesai dimuat
window.addEventListener("DOMContentLoaded", animateOnScroll);

// Jalankan saat scroll
window.addEventListener("scroll", animateOnScroll);

// NAVBAR SCROLL
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
  }

  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // Link aktif berdasarkan halaman
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html";

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", function () {
      navLinks.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
    });

    // Scroll smooth jika href-nya anchor
    if (linkHref && linkHref.startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(linkHref);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
});

// TENTANG KAMI
document.addEventListener("DOMContentLoaded", () => {
  const fadeUps = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeUps.forEach((el) => observer.observe(el));
});

// TEKS MENGETIK
const texts = ["di Website Sahcita", "Legalitas Aman Bisnis Nyaman"];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 70;
const pause = 1200;
const dynamicText = document.getElementById("dynamic-text");

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  dynamicText.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, pause);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, speed);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

document.addEventListener("DOMContentLoaded", type);

// LAYANAN KAMI
const tabs = document.querySelectorAll(".service-tab");
const contents = document.querySelectorAll(".service-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-target");

    // Nonaktifkan semua tab dan konten
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => {
      c.classList.remove("active");
      setTimeout(() => (c.style.display = "none"), 300);
    });

    // Aktifkan tab yang diklik
    tab.classList.add("active");
    const activeContent = document.getElementById(target);

    // Tampilkan konten dengan delay agar transisi smooth
    setTimeout(() => {
      activeContent.style.display = "block";
      setTimeout(() => activeContent.classList.add("active"), 40);
    }, 300);
  });
});
