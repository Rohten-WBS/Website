function getBlogPost() {
  var postId = getUrlParameter("postId");
  if (postId) {
    loadPost(postId);
  } else {
    loadPostList();
  }
}

function loadPost(postId) {
  $(document).ready(function () {
    $.get("/Website/blog/posts/" + postId + ".html", function (data) {
      var postTitle = $(data).find(".post_title").text();
      var postDate = $(data).find(".post_date").text();
      var postContent = $(data).find(".post_content").text();

      $("#blog-content").html(
        '<h1 class="box_light" >' +
          postTitle +
          "</h1>" +
          '<p class="small_body post_date">' +
          postDate +
          "</p>" +
          '<div class="box"><p>' +
          postContent +
          "</p></div>"
      );
    });
  });
}

async function loadPostList() {
  const postListHtml = [];
  const data = await $.ajax({
    url: "/Website/blog/posts/posts.json",
  });
  for (let i = data.posts.length -1; i >= 0; i--) {
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
          <a href="Website/blog/" class="blog-link" data-post-id="${postId}">
            <div class="prev_title">${postTitle}</div>
            <div class="prev_date">(${postDate})</div>
          </a>
        </div>
        <div class="small_body">
          <p>${postContent}... <a href="Website/blog/" class="blog-link" data-post-id="${postId}">  read more</a></p>  
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