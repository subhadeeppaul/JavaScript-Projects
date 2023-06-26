// Get references to the necessary DOM elements
const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActive = 1; // Current active step

// Arrow function to update the progress bar and circles
const update = () => {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const activeSteps = document.querySelectorAll(".active");

  const progressWidth =
    ((activeSteps.length - 1) / (circles.length - 1)) * 100 + "%";
  progress.style.width = progressWidth;

  prev.disabled = currentActive === 1;
  next.disabled = currentActive === circles.length;
};

// Event listener for the next button
next.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  update();
});

// Event listener for the previous button
prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});
