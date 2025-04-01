const cardsContainer = document.querySelector(".container");

cardsContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".card");

  if (!target) return;

  cardsContainer.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("active");
  });

  target.classList.add("active");
});
function triggerConfetti() {
    // Use the Confetti library to trigger confetti explosion
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
    });
}
