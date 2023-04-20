document.querySelector(".edit-post").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector(".post-title").value;
  const content = document.querySelector(".post-content").value;
  const id = document.querySelector(".edit-post").dataset.id;

  const response = await fetch(`/api/posts/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // document.location.replace("/dashboard");
    console.log(response);
    console.log(id);
    console.log(title);
    console.log(content);
  } else {
    alert("There was an error while editing post");
  }
});
