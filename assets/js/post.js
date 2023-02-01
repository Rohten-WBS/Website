function getBlogPost() {
  console.log("Test");
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
          '<article class="box"><p>' +
          postContent +
          "</p></article>"
      );
    });
  });
}

function loadPostList() {
  console.log("Test2");
  $(document).ready(function () {
    var postListHtml = "";
    console.log("Test2_ab");
    $.ajax({
      url: "/Website/blog/posts/",
      success: function (data) {
        console.log("Test2_b");
        $(data)
          .find("a")
          .each(function () {
            var postLink = $(this).attr("href");
            console.log("Test2_c");
            if (postLink.endsWith(".html")) {
              var postId = postLink
                .substr(0, postLink.length - 5)
                .split("/")
                .pop();
              $.get("/Website/blog/posts/" + postId + ".html", function (postData) {
                var postTitle = $(postData).find(".post_title").text();
                var postDate = $(postData).find(".post_date").text();
                var postContent = $(postData)
                  .find(".post_content")
                  .text()
                  .split(" ")
                  .slice(0, 51)
                  .join(" ");

                postListHtml +=
                  '<section><div class="small_header"><a href="/blog/" class="blog-link" data-post-id="' +
                  postId +
                  '"><div class="prev_title">' +
                  postTitle +
                  '</div><div class="prev_date">(' +
                  postDate +
                  ')</div></a></div><div class="small_body"><p>' +
                  postContent +
                  '... <a href="/blog/?postId=' +
                  postId +
                  '">  read more</a></div></section>';
                $("#blog-content").html(postListHtml);
              });
            }
          });
          BlogClick()
          console.log("Test3");
      },
      error: function(){
        console.log(textStatus);
      },

    });
    console.log("Test4");
  });
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