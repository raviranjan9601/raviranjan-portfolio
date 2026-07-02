var body = document.body;
var themeToggle = document.querySelector(".theme-toggle");
var themeIcon = themeToggle.querySelector("i");
var navToggle = document.querySelector(".nav-toggle");
var navMenu = document.querySelector(".nav-menu");
var typingText = document.querySelector("#typing-text");
var contactForm = document.querySelector("#contactForm");
var formStatus = document.querySelector("#formStatus");
var resumeBtn = document.querySelector("#resumeBtn");
var year = document.querySelector("#year");
var phrases = [
  "premium websites.",
  "responsive interfaces.",
  "clean front-end systems.",
  "delightful user journeys.",
];
var phraseIndex = 0;
var letterIndex = 0;
var isDeleting = false;
year.textContent = new Date().getFullYear();
var savedTheme = localStorage.getItem("portfolio-theme");
var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  body.classList.add("light-mode");
  themeIcon.className = "fa-solid fa-sun";
}
function typeLoop() {
  var currentPhrase = phrases[phraseIndex];
  typingText.textContent = currentPhrase.slice(0, letterIndex);
  if (!isDeleting && letterIndex < currentPhrase.length) {
    letterIndex += 1;
    setTimeout(typeLoop, 75);
    return;
  }
  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1400);
    return;
  }
  if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeLoop, 42);
    return;
  }
  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 250);
}
function closeMenu() {
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("nav-open");
  navToggle.querySelector("i").className = "fa-solid fa-bars";
}
themeToggle.addEventListener("click", function () {
  body.classList.toggle("light-mode");
  var isLight = body.classList.contains("light-mode");
  themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});
navToggle.addEventListener("click", function () {
  var isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("nav-open", isOpen);
  navToggle.querySelector("i").className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});
document.querySelectorAll(".nav-menu a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
});
resumeBtn.addEventListener("click", function () {
  var resume = [
    "Ravi Kumar",
    "Front-End Developer",
    "",
    "Profile",
    "Modern front-end developer specializing in responsive websites, polished UI, and clean JavaScript.",
    "",
    "Core Skills",
    "HTML5, CSS3, JavaScript, Responsive Design, Accessibility, Performance Optimization",
    "",
    "Selected Projects",
    "Insight Analytics, Nova Commerce, Studio Planner",
    "",
    "Contact",
    "hello@example.com",
  ].join("\n");
  var blob = new Blob([resume], { type: "text/plain" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "Ravi-Kumar-Resume.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please complete all fields correctly.";
    formStatus.style.color = "#ff7a90";
    return;
  }
  formStatus.textContent = "Thanks. Your message is ready to be sent.";
  formStatus.style.color = "var(--success)";
  contactForm.reset();
});
typeLoop();
