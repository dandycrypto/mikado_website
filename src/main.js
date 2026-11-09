/* Mikado Group — progressive enhancement only. The site works without this file. */

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const setScrolled = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
};
setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

const closeNav = () => {
  if (!toggle || !nav) return;
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNav();
  });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const interest = String(data.get("interest") || "General enquiry");
    const subject = `Website enquiry — ${interest}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Organisation: ${data.get("org") || ""}`,
      `Interest: ${interest}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");

    const status = form.querySelector("[data-form-status]");
    window.location.href = `mailto:info@mikadogroup.com.au?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Opening your email client with the message details.";
  });
}
