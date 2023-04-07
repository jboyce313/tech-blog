const renderPostPage = async (e) => {
  const id = e.target.dataset.id;

  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/post/${id}`);
  } else {
    alert("Error getting post data");
  }
};

const posts = document.querySelectorAll(".post-title");

console.log(posts);

for (let i = 0; i < posts.length; i++) {
  posts[i].addEventListener("click", renderPostPage);
}
