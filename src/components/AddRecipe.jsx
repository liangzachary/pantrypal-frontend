import React, { useState } from "react";

export default function AddRecipe({ onCreated }) {
  // New fields!
  const [id, setId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [ingredients, setIngredients] = useState([""]);
  const [kitchenware, setKitchenware] = useState([""]);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Bulleted fields
  const handleIngredientChange = (i, value) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });
  };
  const addIngredient = () => setIngredients(prev => [...prev, ""]);
  const removeIngredient = i => setIngredients(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  const handleKitchenwareChange = (i, value) => {
    setKitchenware(prev => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });
  };
  const addKitchenware = () => setKitchenware(prev => [...prev, ""]);
  const removeKitchenware = i => setKitchenware(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  const incrementServings = () => setServings(s => s + 1);
  const decrementServings = () => setServings(s => Math.max(1, s - 1));

  const handleDifficulty = e => {
    const v = Number(e.target.value);
    setDifficulty(Math.min(3, Math.max(1, v)));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) {
      setMsg("Admin password required!");
      return;
    }
    // Clean up fields
    const filteredIngredients = ingredients.map(i => i.trim()).filter(i => i);
    const filteredKitchenware = kitchenware.map(i => i.trim()).filter(i => i);
    if (!nickname || !realName || !time || !imgUrl || filteredIngredients.length === 0 || filteredKitchenware.length === 0) {
      setMsg("Please fill all required fields.");
      return;
    }
    const recipe = {
      id: id ? id : undefined, // optional, backend can assign if missing
      imgUrl,
      nickname,
      real_name: realName,
      time: Number(time),
      servings,
      difficulty,
      ingredients: filteredIngredients,
      kitchenware: filteredKitchenware,
    };
    try {
      const res = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("Recipe added!");
      setId(""); setImgUrl(""); setNickname(""); setRealName(""); setTime(""); setServings(1);
      setDifficulty(1); setIngredients([""]); setKitchenware([""]); setPassword("");
      onCreated && onCreated();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded shadow max-w-sm mx-auto mt-6">
      <h2 className="text-xl font-bold mb-1">Add New Recipe</h2>
      {/* ID and Image URL */}
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID (optional)" className="p-2 border rounded" />
      <input required value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="Image URL" className="p-2 border rounded" />
      {/* Main fields */}
      <input required value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Recipe nickname" className="p-2 border rounded" />
      <input required value={realName} onChange={e => setRealName(e.target.value)} placeholder="Your real name" className="p-2 border rounded" />
      <input required type="number" min={1} value={time} onChange={e => setTime(e.target.value)} placeholder="Time (mins)" className="p-2 border rounded" />
      {/* Servings */}
      <div className="flex items-center gap-2">
        <span className="font-bold">Servings:</span>
        <button type="button" className="bg-gray-200 rounded w-8 h-8 font-bold text-lg" onClick={decrementServings}>-</button>
        <span>{servings}</span>
        <button type="button" className="bg-gray-200 rounded w-8 h-8 font-bold text-lg" onClick={incrementServings}>+</button>
      </div>
      {/* Difficulty */}
      <div className="flex flex-col gap-1">
        <span className="font-bold">Difficulty:</span>
        <div className="flex gap-3">
          {[1,2,3].map(val => (
            <label key={val} className="flex items-center gap-1">
              <input
                type="radio"
                name="difficulty"
                value={val}
                checked={difficulty === val}
                onChange={handleDifficulty}
                required
              />
              {val}
            </label>
          ))}
        </div>
      </div>
      {/* Ingredients */}
      <div className="flex flex-col gap-1">
        <span className="font-bold">Ingredients:</span>
        {ingredients.map((ing, i) => (
          <div className="flex items-center gap-1 mb-1" key={i}>
            <span>•</span>
            <input
              required
              value={ing}
              onChange={e => handleIngredientChange(i, e.target.value)}
              className="p-2 border rounded flex-1"
              placeholder={`Ingredient #${i+1}`}
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(i)} className="text-red-500 font-bold text-lg px-2">×</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="text-xs underline text-blue-600 self-start mt-1">Add Ingredient</button>
      </div>
      {/* Kitchenware */}
      <div className="flex flex-col gap-1">
        <span className="font-bold">Kitchenware:</span>
        {kitchenware.map((kw, i) => (
          <div className="flex items-center gap-1 mb-1" key={i}>
            <span>•</span>
            <input
              required
              value={kw}
              onChange={e => handleKitchenwareChange(i, e.target.value)}
              className="p-2 border rounded flex-1"
              placeholder={`Kitchenware #${i+1}`}
            />
            {kitchenware.length > 1 && (
              <button type="button" onClick={() => removeKitchenware(i)} className="text-red-500 font-bold text-lg px-2">×</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addKitchenware} className="text-xs underline text-blue-600 self-start mt-1">Add Kitchenware</button>
      </div>
      {/* Admin password (submission required) */}
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
      {msg && <div className="text-center text-sm mt-2">{msg}</div>}
    </form>
  );
}
