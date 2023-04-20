const submitComment = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/users/loggedin", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const content = document.querySelector(".comment-field").value.trim();
    const post_id = document.querySelector(".post").dataset.id;
    const user_id = response.statusText.split("/")[0];

    const response3 = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ content, post_id, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response3.ok) {
      console.log("Comment posted");
      location.reload();
    } else {
      alert("error posting comment");
    }
  } else {
    alert(response.status);
  }
};

const submitCommentButton = document.querySelector(".add-comment");
if (submitCommentButton) {
  submitCommentButton.addEventListener("submit", submitComment);
}