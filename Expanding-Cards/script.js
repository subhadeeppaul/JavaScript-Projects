const panels = document.querySelectorAll(".panel");

// Add click event listener to each panel
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses(); // Remove active class from all panels
    panel.classList.add("active"); // Add active class to the clicked panel
  });
});

// Function to remove active classes from all panels
function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active"); // Remove active class from each panel
  });
}
