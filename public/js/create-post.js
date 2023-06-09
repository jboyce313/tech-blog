document.querySelector(".create-post").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector(".post-title").value;
  const content = document.querySelector(".new-post-content").value;

  const response = await fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("An error occurred while creating post");
  }
});
