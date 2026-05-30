console.log("Página web de San Antonio Alpanocan cargada correctamente.");

const eventsTrack = document.querySelector("#eventsTrack");
const prevButton = document.querySelector(".slider-btn-prev");
const nextButton = document.querySelector(".slider-btn-next");

if (eventsTrack && prevButton && nextButton) {
  const getScrollAmount = () => {
    const card = eventsTrack.querySelector(".event-card");

    if (!card) return 0;

    const cardStyles = window.getComputedStyle(card);
    const trackStyles = window.getComputedStyle(eventsTrack);

    const cardWidth = card.offsetWidth;
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 24);

    return cardWidth + gap;
  };

  const isAtEnd = () => {
    const tolerance = 8;

    return (
      eventsTrack.scrollLeft + eventsTrack.clientWidth >=
      eventsTrack.scrollWidth - tolerance
    );
  };

  const isAtStart = () => {
    const tolerance = 8;

    return eventsTrack.scrollLeft <= tolerance;
  };

  const moveSlider = (direction) => {
    const scrollAmount = getScrollAmount();

    if (!scrollAmount) return;

    if (direction === 1 && isAtEnd()) {
      eventsTrack.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    if (direction === -1 && isAtStart()) {
      eventsTrack.scrollTo({
        left: eventsTrack.scrollWidth,
        behavior: "smooth",
      });

      return;
    }

    eventsTrack.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  prevButton.addEventListener("click", () => moveSlider(-1));
  nextButton.addEventListener("click", () => moveSlider(1));
}
