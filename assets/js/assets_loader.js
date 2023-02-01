document.addEventListener("DOMContentLoaded", function() {
  fetch("/Website/assets/header.html")
    .then(response => response.text())
    .then(header => {
      document.querySelector("header").innerHTML = header;
    });
  fetch("/Website/assets/footer.html")
    .then(response => response.text())
    .then(footer => {
      document.querySelector("footer").innerHTML = footer;
    });
});