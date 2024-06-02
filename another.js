document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll("button.square");
  const squaresArray = Array.from(squares);

  squaresArray.forEach(function (square) {
    const squareId = square.id;
    const isClicked = localStorage.getItem(squareId);

    if (isClicked === "true") {
      square.classList.add("clicked");
    }

    square.addEventListener("click", function () {
      console.log("Button " + square.id + " clicked");
      square.classList.add("clicked");
      localStorage.setItem(square.id, "true");
    });
  });

  const addBtns = document.querySelectorAll(".add-pts");
  const subBtns = document.querySelectorAll(".sub-pts");

  addBtns.forEach(function (addBtn) {
    addBtn.addEventListener("click", function () {
      const teamNumber = addBtn.dataset.team;
      const scoreElement = document.querySelector(
        `.score[data-team="${teamNumber}"]`
      );
      let score = parseInt(scoreElement.textContent);
      score += 100;
      scoreElement.textContent = score;
      localStorage.setItem(`team-${teamNumber}-score`, score);
    });
  });

  subBtns.forEach(function (subBtn) {
    subBtn.addEventListener("click", function () {
      const teamNumber = subBtn.dataset.team;
      const scoreElement = document.querySelector(
        `.score[data-team="${teamNumber}"]`
      );
      let score = parseInt(scoreElement.textContent);
      score -= 100;
      scoreElement.textContent = score;
      localStorage.setItem(`team-${teamNumber}-score`, score);
    });
  });

  const resetBtn = document.querySelector(".reset-btn");
  resetBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });

  document.querySelectorAll(".score").forEach(function (scoreElement) {
    const teamNumber = scoreElement.dataset.team;
    const score = localStorage.getItem(`team-${teamNumber}-score`);
    if (score !== null) {
      scoreElement.textContent = score;
    }
  });
});
