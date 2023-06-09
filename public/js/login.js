document.querySelector(".login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector(".username").value.trim();
  const password = document.querySelector(".password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      if (response.statusText === "invalid")
        alert("Invalid username or password");
      else alert("Server error");
    }
  }
});
