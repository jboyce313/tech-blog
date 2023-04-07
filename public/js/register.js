document.querySelector(".register").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector(".register-username").value.trim();
  const password = document.querySelector(".register-password").value.trim();
  const confirmPassword = document
    .querySelector(".confirm-password")
    .value.trim();

  if (username && password && confirmPassword) {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Account created!");
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
});
