document.addEventListener("DOMContentLoaded", function() {
  fetch("/Website/assets/header.html")
    .then(response => response.text())
    .then(header => {
      document.querySelector("header").innerHTML = header;
      var aboutUs = document.getElementById("about-us");
      var aboutUsDropdown = document.getElementById("about-us-dropdown");

      aboutUs.addEventListener("click", function() {
        aboutUsDropdown.style.display = aboutUsDropdown.style.display === "none" ? "" : "none";
      });

      document.addEventListener("click", function(event) {
        if (!event.target.closest("#about-us-dropdown, #about-us")) {
          aboutUsDropdown.style.display = "none";
        }
      });
    });
  fetch("/Website/assets/footer.html")
    .then(response => response.text())
    .then(footer => {
      document.querySelector("footer").innerHTML = footer;
    });
});