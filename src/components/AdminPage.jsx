import React, { useState, useEffect } from "react";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [recipeData, setRecipeData] = useState({ title: "", description: "" });

  // Try to auto-auth from localStorage
  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setAuthed(true);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === "psswrd") { // <-- Change this password!
      setAuthed(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("Wrong password");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Example: POST to backend with password in header
    const res = await fetch("https://spatch.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(recipeData),
    });
    if (res.ok) {
      alert("Recipe created!");
    } else {
      alert("Failed to create recipe");
    }
  }

  if (!authed) {
    return (
      <form onSubmit={handleLogin} className="flex flex-col items-center mt-12 gap-2">
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-teal-500 px-3 py-1 rounded text-white">Unlock Admin</button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center mt-12 gap-4">
      <h2 className="text-2xl font-bold mb-4">Recipe Admin Panel</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={recipeData.title}
          onChange={e => setRecipeData({ ...recipeData, title: e.target.value })}
          placeholder="Recipe Title"
          className="border px-2 py-1"
        />
        <input
          value={recipeData.description}
          onChange={e => setRecipeData({ ...recipeData, description: e.target.value })}
          placeholder="Recipe Description"
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-orange-500 px-3 py-1 rounded text-white">Save Recipe</button>
      </form>
    </div>
  );
}
