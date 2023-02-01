function getBlogPost() {
  var postId = getUrlParameter("postId");
  if (postId) {
    loadPost(postId);
  } else {
    loadPostList();
  }
}

function loadPost(postId) {
  document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/Website/blog/posts/" + postId + ".html", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xhr.responseText, "text/html");
        var postTitle = doc.querySelector(".post_title").textContent;
        var postDate = doc.querySelector(".post_date").textContent;
        var postContent = doc.querySelector(".post_content").textContent;

        document.querySelector("#blog-content").innerHTML =
          '<h1 class="box_light">' +
          postTitle +
          "</h1>" +
          '<p class="small_body post_date">' +
          postDate +
          "</p>" +
          '<article class="box"><p>' +
          postContent +
          "</p></article>";
      }
    };
    xhr.send();
  });
}

async function loadPostList() {
  const postListHtml = [];
  const data = await $.ajax({
    url: "/Website/blog/posts/posts.json",
  });

  for (let i = data.posts.length - 1; i >= 0; i--) {
    const postId = data.posts[i].id;
    const postUrl = "/Website/blog/posts/" + postId + ".html";
    const postData = await $.get(postUrl);

    const postTitle = $(postData).find(".post_title").text();
    const postDate = $(postData).find(".post_date").text();
    const postContent = $(postData)
      .find(".post_content")
      .text()
      .split(" ")
      .slice(0, 51)
      .join(" ");

    postListHtml.push(
      `<section>
        <div class="small_header">
          <a href="/blog/" class="blog-link" data-post-id="${postId}">
            <div class="prev_title">${postTitle}</div>
            <div class="prev_date">(${postDate})</div>
          </a>
        </div>
        <div class="small_body">
          <p>${postContent}... <a href="/Website/blog/?postId=${postId}">  read more</a></p>
        </div>
      </section>`
    );
  }

  $("#blog-content").html(postListHtml.join(""));
  BlogClick();
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BlogClick() {
  $(document).ready(function () {
    $(document).on("click", ".blog-link", function (event) {
      event.preventDefault();
      var postId = $(this).data("post-id");
      window.location.href = "/Website/blog/?postId=" + postId;
    });
  });
}

BlogClick();