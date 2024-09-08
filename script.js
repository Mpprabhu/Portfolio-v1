const header = document.querySelector(".header");
const aboutSection = document.querySelector(".about-section");
const allSections = document.querySelectorAll(".section");
const footer = document.querySelector("footer");

// Sticky Navigation
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

observer.observe(aboutSection);

// Section Revealer
const revealElement = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealElement, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section-hidden");
});

// Contact Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModel = document.querySelector(".close-modal");
const btnsOpenModel = document.querySelectorAll(".btn-contact");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModel.length; i++) {
  btnsOpenModel[i].addEventListener("click", openModal);
}

btnCloseModel.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Footer text
footer.textContent = `Copyright © ${new Date().getFullYear()} by Prabhu M P, This project is used as my personal Portfolio and also as a development project, Best to view my portfolio in desktop`;

// Mobile Navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
// const header = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  header.classList.toggle("high-index");
});

// Smooth Scrolling Animation

const allLinks = document.querySelectorAll(".nav-link");
console.log(allLinks);

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll Back to Top

    if (href == "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to Other Links

    if (href != "#" && href.startsWith("#")) {
      const SectionEl = document.querySelector(href);
      SectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close Mobile Navigation via clicking link

    if (link.classList.contains("nav-link"))
      header.classList.toggle("nav-open");
  });
});
