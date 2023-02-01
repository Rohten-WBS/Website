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
  const data = await fetch("/Website/blog/posts/posts.json").then((res) =>
    res.json()
  );

  for (let i = data.posts.length - 1; i >= 0; i--) {
    const postId = data.posts[i].id;
    const postUrl = "/Website/blog/posts/" + postId + ".html";
    const postData = await fetch(postUrl).then((res) => res.text());

    const parser = new DOMParser();
    const postHtml = parser.parseFromString(postData, "text/html");

    const postTitle = postHtml.querySelector(".post_title").textContent;
    const postDate = postHtml.querySelector(".post_date").textContent;
    const postContent = postHtml.querySelector(".post_content")
      .textContent.trim()
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
          <p>${postContent}... <a href="/Website/blog/?postId=${postId}">read more</a></p>
        </div>
      </section>`
    );
  }

  document.querySelector("#blog-content").innerHTML = postListHtml.join("");
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
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function(event) {
      if (!event.target.classList.contains('blog-link')) {
        return;
      }
      event.preventDefault();
      const postId = event.target.dataset.postId;
      window.location.href = "/Website/blog/?postId=" + postId;
    });
  });
}

BlogClick();