document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/Website/assets/header.html", true);
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
  document.querySelector("header").innerHTML = xhr.responseText;
  }
  };
  xhr.send();
  
  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "/Website/assets/footer.html", true);
  xhr2.onreadystatechange = function () {
  if (xhr2.readyState === 4 && xhr2.status === 200) {
  document.querySelector("footer").innerHTML = xhr2.responseText;
  }
  };
  xhr2.send();
  });