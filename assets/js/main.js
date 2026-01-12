document.addEventListener("DOMContentLoaded", () => {
  /* Fade-in effect */
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.6s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  /* Dark / Light theme toggle */
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    toggle.textContent = savedTheme === "light" ? "🌙" : "☀";
  }

  toggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
    toggle.textContent = current === "light" ? "🌙" : "☀";
  });
});
