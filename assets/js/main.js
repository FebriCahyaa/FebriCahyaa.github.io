document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.textContent = theme === "dark" ? "☀" : "🌙";
  }

  const saved = localStorage.getItem("theme");
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(systemTheme.matches ? "dark" : "light");
  }

  systemTheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }
});
