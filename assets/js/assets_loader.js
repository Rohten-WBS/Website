var scripts = document.getElementById('loader');
var path = scripts.src.split('?')[0];
var mydir = path.split('/').slice(0, -2).join('/')+'/';
console.log(mydir);
$(document).ready(function () {
  $("header").load(mydir + "header.html");
  $("footer").load(mydir + "footer.html");
});