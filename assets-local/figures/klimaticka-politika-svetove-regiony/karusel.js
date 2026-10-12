/* Arrows for the "Hlavní charakteristiky" cards when they are a carousel
 * (.region-grid.is-carousel, styles in assets-local/_chart-panel.scss).
 * Without that class the arrows stay hidden and the cards are the 2×2 grid.
 * The carousel itself is plain CSS scroll-snap, so swiping works on its own.
 */
(function () {
  document.querySelectorAll(".region-grid").forEach(grid => {
    const nav = document.createElement("div");
    nav.className = "region-carousel-nav";
    nav.innerHTML =
      `<button type="button" aria-label="Předchozí"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
       <button type="button" aria-label="Další"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>`;
    grid.after(nav);

    const [prev, next] = nav.querySelectorAll("button");
    const step = () => grid.firstElementChild.offsetWidth;
    prev.addEventListener("click", () => grid.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => grid.scrollBy({ left: step(), behavior: "smooth" }));

    const update = () => {
      prev.disabled = grid.scrollLeft <= 1;
      next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
      grid.classList.toggle("at-end", next.disabled);   // moves the fade to the left edge
    };
    grid.addEventListener("scroll", update, { passive: true });
    // Card width changes on resize and when the grid turns into a carousel.
    new ResizeObserver(update).observe(grid.firstElementChild);
  });
})();
