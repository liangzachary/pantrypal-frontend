// src/components/AddRecipe.jsx
import React, { useState } from "react";

export default function AddRecipe({ onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [ingredients, setIngredients] = useState(""); // Comma separated for demo
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const recipe = {
      name,
      description,
      difficulty,
      ingredients: ingredients.split(",").map(s => s.trim()), // Array
    };
    try {
      const res = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "spatchSecret123", // CHANGE THIS to your real secret!
        },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setMsg("Recipe added!");
      setName(""); setDescription(""); setDifficulty(1); setIngredients("");
      onCreated && onCreated();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white p-4 rounded shadow max-w-xs mx-auto">
      <h2 className="text-xl font-bold mb-2">Add New Recipe</h2>
      <input required value={name} onChange={e => setName(e.target.value)} placeholder="Recipe name" className="p-2 border rounded" />
      <input required value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded" />
      <input required value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="p-2 border rounded" />
      <input type="number" min={1} max={5} value={difficulty} onChange={e => setDifficulty(Number(e.target.value))} placeholder="Difficulty (1-5)" className="p-2 border rounded" />
      <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-black py-2 rounded font-bold">Add Recipe</button>
      {msg && <div className="text-center text-sm mt-2">{msg}</div>}
    </form>
  );
}
