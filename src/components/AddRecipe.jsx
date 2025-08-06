import React, { useState, useEffect } from "react";

export default function AddRecipe({ onCreated }) {
  const [id, setId] = useState("");
  const [imgFile, setImgFile] = useState(null);    // <-- changed from imgUrl
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [ingredients, setIngredients] = useState([""]);
  const [kitchenware, setKitchenware] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // ... (ingredient/kitchenware/step handlers stay the same)

  // Success message fadeout effect
  useEffect(() => {
    if (msg === "Recipe added!") {
      const timeout = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) {
      setMsg("Admin password required!");
      return;
    }
    const filteredIngredients = ingredients.map(i => i.trim()).filter(i => i);
    const filteredKitchenware = kitchenware.map(i => i.trim()).filter(i => i);
    const filteredSteps = steps.map(s => s.trim()).filter(s => s);
    if (!nickname || !realName || !time || !imgFile || filteredIngredients.length === 0 || filteredKitchenware.length === 0 || filteredSteps.length === 0) {
      setMsg("Please fill all required fields.");
      return;
    }
    const formData = new FormData();
    if (id) formData.append("id", id);
    formData.append("imgFile", imgFile); // <--- file
    formData.append("nickname", nickname);
    formData.append("real_name", realName);
    formData.append("time", time);
    formData.append("servings", servings);
    formData.append("difficulty", difficulty);
    formData.append("ingredients", JSON.stringify(filteredIngredients));
    formData.append("kitchenware", JSON.stringify(filteredKitchenware));
    formData.append("steps", JSON.stringify(filteredSteps));

    try {
      const res = await fetch("https://spatch.onrender.com/recipes/", {
        method: "POST",
        headers: {
          "x-admin-password": password,
          // DO NOT set "Content-Type"
        },
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("Recipe added!");
      setId(""); setImgFile(null); setNickname(""); setRealName(""); setTime(""); setServings(1);
      setDifficulty(1); setIngredients([""]); setKitchenware([""]); setSteps([""]); setPassword("");
      onCreated && onCreated();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded shadow max-w-sm mx-auto mt-6">
      <h2 className="text-xl font-bold mb-1">Add New Recipe</h2>
      {/* ID and Image File */}
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID (optional)" className="p-2 border rounded" />
      <input
        required
        type="file"
        accept="image/*"
        onChange={e => setImgFile(e.target.files[0])}
        className="p-2 border rounded"
      />
      {/* The rest of your fields remain unchanged... */}
      <input required value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Recipe nickname" className="p-2 border rounded" />
      <input required value={realName} onChange={e => setRealName(e.target.value)} placeholder="Recipe real name" className="p-2 border rounded" />
      <input required type="number" min={1} value={time} onChange={e => setTime(e.target.value)} placeholder="Time (mins)" className="p-2 border rounded" />
      {/* Servings and difficulty fields */}
      {/* ... ingredient, kitchenware, step sections ... */}
      {/* Password and submit */}
      <input
        required
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter admin password"
        className="p-2 border rounded"
        autoComplete="off"
      />
      <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-black py-2 rounded font-bold mt-2">
        Add Recipe
      </button>
      {/* Success/Error Message */}
      {msg && (
        <div
          className={
            msg === "Recipe added!"
              ? "bg-green-100 text-green-800 font-semibold px-4 py-2 mt-3 mb-1 rounded text-center shadow"
              : "bg-red-100 text-red-800 font-semibold px-4 py-2 mt-3 mb-1 rounded text-center shadow"
          }
        >
          {msg}
        </div>
      )}
    </form>
  );
}
