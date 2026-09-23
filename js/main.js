(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobilePanel = document.querySelector("[data-mobile-panel]");
  if (navToggle && mobilePanel) {
    navToggle.addEventListener("click", function () {
      var open = mobilePanel.getAttribute("data-open") === "true";
      mobilePanel.setAttribute("data-open", String(!open));
      navToggle.setAttribute("aria-expanded", String(!open));
      document.body.style.overflow = open ? "" : "hidden";
    });
    mobilePanel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobilePanel.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Desktop "Memorias" dropdown
  document.querySelectorAll("[data-dropdown]").forEach(function (dd) {
    var btn = dd.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dd.getAttribute("data-open") === "true";
      document.querySelectorAll("[data-dropdown]").forEach(function (o) { o.setAttribute("data-open", "false"); });
      dd.setAttribute("data-open", String(!open));
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll("[data-dropdown]").forEach(function (o) { o.setAttribute("data-open", "false"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll("[data-dropdown]").forEach(function (o) { o.setAttribute("data-open", "false"); });
    }
  });

  // Scroll-reveal: IntersectionObserver only, never a scroll listener,
  // so nothing here can intercept or break the user's wheel/trackpad input.
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
