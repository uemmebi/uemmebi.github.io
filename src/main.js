import "./style.css";
import details from "./project-details.js";

const root = document.documentElement;
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const themeButton = document.querySelector(".theme-button");
function applyTheme(theme) {
  root.dataset.theme = theme === "dark" ? "dark" : "light";
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
  themeButton.title = `Switch to ${next} theme`;
  document.querySelector('meta[name="theme-color"]').content =
    next === "light" ? "#000000" : "#ffffff";
}
try {
  applyTheme(localStorage.getItem("uemmebi-theme") === "light" ? "light" : "dark");
} catch {
  applyTheme("dark");
}
themeButton.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try {
    localStorage.setItem("uemmebi-theme", theme);
  } catch {
  }
});

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  nav.classList.toggle("open", open);
});
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 },
);
reveals.forEach((el) => observer.observe(el));
function syncMotion() {
  root.classList.toggle("js-motion", !motion.matches);
}
syncMotion();
motion.addEventListener("change", syncMotion);

let scheduled = false;
function updateNav() {
  let current = "";
  ["work", "about", "journey", "contact", "support"].forEach((id) => {
    if (
      document.getElementById(id).getBoundingClientRect().top <=
      innerHeight * 0.35
    )
      current = id;
  });
  nav.querySelectorAll("a").forEach((a) => {
    const active = a.hash === `#${current}`;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
  scheduled = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNav);
    }
  },
  { passive: true },
);
updateNav();

function wireDialog(dialog, closeSelector) {
  let trigger;
  dialog
    .querySelector(closeSelector)
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () =>
    trigger?.focus({ preventScroll: true }),
  );
  return (button) => {
    trigger = button;
    dialog.showModal();
    dialog.scrollTop = 0;
  };
}
const projectDialog = document.querySelector(".project-dialog");
const openProject = wireDialog(projectDialog, ".dialog-close");
projectDialog.querySelector(".dialog-title").id = "project-dialog-title";
projectDialog.setAttribute("aria-labelledby", "project-dialog-title");
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", () => {
    const project = details[button.dataset.project];
    projectDialog.querySelector(".dialog-category").textContent =
      project.category;
    projectDialog.querySelector(".dialog-title").textContent = project.title;
    projectDialog.querySelector(".dialog-intro").textContent = project.intro;
    projectDialog.querySelector(".dialog-body").innerHTML = project.body;
    openProject(button);
  }),
);
const openSiteInfo = wireDialog(
  document.querySelector(".site-dialog"),
  ".site-dialog-close",
);
document
  .querySelector("[data-site-info]")
  .addEventListener("click", (e) => openSiteInfo(e.currentTarget));

let copyTimer;
document.querySelector(".copy-email").addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText("umberto.alinei@gmail.com");
    status.textContent = "Email copied.";
  } catch {
    status.textContent = "Select and copy the email address above.";
  }
  copyTimer = setTimeout(() => {
    status.textContent = "";
  }, 4000);
});
function updateTime() {
  document.querySelector(".local-time").textContent =
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()) + " IN NAPLES";
  document.querySelector(".copyright-year").textContent =
    new Intl.DateTimeFormat("en", {
      timeZone: "Europe/Rome",
      year: "numeric",
    }).format(new Date());
}
updateTime();
setInterval(updateTime, 60000);
