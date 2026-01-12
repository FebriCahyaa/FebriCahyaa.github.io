document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     Page Loading Progress
  ===================== */
  const bar = document.createElement("div");
  bar.id = "progress";
  document.body.appendChild(bar);

  requestAnimationFrame(() => bar.style.width = "30%");
  window.addEventListener("load", () => bar.style.width = "100%");
  setTimeout(() => bar.remove(), 600);

  /* =====================
     Auto Theme (System)
  ===================== */
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;

  root.setAttribute("data-theme", saved || (systemDark ? "dark" : "light"));

  /* Theme toggle */
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.textContent =
      root.getAttribute("data-theme") === "light" ? "🌙" : "☀";

    toggle.onclick = () => {
      const t =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", t);
      localStorage.setItem("theme", t);
      toggle.textContent = t === "light" ? "🌙" : "☀";
    };
  }

  /* =====================
     Back Button (Projects)
  ===================== */
  const backBtn = document.getElementById("back-button");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      navigator.vibrate?.(10);

      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = "../index.html";
      }
    });
  }

  /* =====================
     Velocity Swipe Back
  ===================== */
  let sx = 0, st = 0;

  window.addEventListener("touchstart", e => {
    if (e.touches[0].clientX < 20) {
      sx = e.touches[0].clientX;
      st = performance.now();
    }
  });

  window.addEventListener("touchend", e => {
    if (!sx) return;
    const dx = e.changedTouches[0].clientX - sx;
    const dt = performance.now() - st;
    const v = dx / dt;

    if (dx > 90 && v > 0.35) {
      navigator.vibrate?.(12);
      history.back();
    }
    sx = 0;
  });

  /* =====================
     Card Shared Transition
  ===================== */
  document.querySelectorAll(".card").forEach(card => {
    card.onclick = () => {
      navigator.vibrate?.(6);
      card.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0.92)" }],
        { duration: 160, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    };
  });

});
