document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s),
    $$ = (s) => document.querySelectorAll(s);
  const mt = $(".mobile-toggle"),
    nav = $("nav ul");
  mt && mt.addEventListener("click", () => nav.classList.toggle("show"));
  const slides = $$(".hero-slide");
  let i = 0;
  slides.length &&
    setInterval(() => {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 5000);
  const filters = $$(".filter-btn"),
    cards = $$(".menu-grid .menu-card");
  filters.forEach(
    (btn) =>
      (btn.onclick = () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const c = btn.dataset.filter;
        cards.forEach(
          (card) =>
            (card.style.display =
              c === "all" || card.dataset.category === c ? "" : "none")
        );
      })
  );
  const badge = $(".cart-badge"),
    icon = $(".cart-icon"),
    drawer = $(".cart-drawer"),
    close = $(".close-cart"),
    list = $(".cart-items");
  let count = 0,
    items = [];
  $$(".menu-card button").forEach(
    (b) =>
      (b.onclick = () => {
        count++;
        badge && (badge.textContent = count);
        const card = b.closest(".menu-card");
        items.push({
          t: card.querySelector("h3").textContent,
          p: card.querySelector(".price").textContent,
        });
        list &&
          (list.innerHTML = items
            .slice(-3)
            .map(
              (it) =>
                `<div class="cart-item"><span>${it.t}</span><span>${it.p}</span></div>`
            )
            .join(""));
      })
  );
  icon &&
    icon.addEventListener(
      "click",
      () => drawer && drawer.classList.add("open")
    );
  close &&
    close.addEventListener(
      "click",
      () => drawer && drawer.classList.remove("open")
    );
  const popup = $(".popup");
  document.querySelectorAll("form").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (f.checkValidity()) {
        popup && (popup.style.display = "flex");
        setTimeout(() => {
          popup && (popup.style.display = "none");
          f.reset();
        }, 2000);
      }
    })
  );
  const slots = $$(".time-slot"),
    ti = $("#time-input");
  slots.forEach(
    (s) =>
      (s.onclick = () => {
        slots.forEach((x) => x.classList.remove("selected"));
        s.classList.add("selected");
        ti && (ti.value = s.textContent);
      })
  );
});
