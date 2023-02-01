document.addEventListener("DOMContentLoaded", function () {
  fetch("/Website/assets/header.html")
    .then((response) => response.text())
    .then((header) => {
      document.querySelector("header").innerHTML = header;
    });
  fetch("/Website/assets/footer.html")
    .then((response) => response.text())
    .then((footer) => {
      document.querySelector("footer").innerHTML = footer;
    });
});

function AboutUs() {
  document.addEventListener("click", function (event) {
    var dropdown = document.querySelector("#about-us-dropdown");
    var aboutUs = document.querySelector("#about-us");
    if (event.target === aboutUs) {
      dropdown.style.display = dropdown.style.display === "none" ? "" : "none";
    } else if (!event.target.closest("#about-us-dropdown")) {
      dropdown.style.display = "none";
    }
  });
}
