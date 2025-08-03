import React, { useEffect, useState } from "react";
import RecipeNode from "./RecipeNode";
import RecipeInfoCallout from "./RecipeInfoCallout";
import BottomNav from "./BottomNav";

export default function MealWorld({ meal = "breakfast" }) {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched recipes:", data);
        setRecipes(data);
      })
      .catch(err => {
        setRecipes([]);
        console.error("Fetch error:", err);
      });
  }, [meal]);

  // Sample path SVG
  const svgPath = (
    <svg className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 390 950" fill="none">
      <path d="M120 80 Q40 160 120 240 Q200 320 120 400 Q40 480 120 560 Q200 640 120 720 Q40 800 120 880"
        stroke="url(#grad)" strokeWidth="16" fill="none" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="390" y2="950" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2F2F" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  );

  // Defensive: show error if not an array
  if (!Array.isArray(recipes)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-400">
        <div className="text-xl text-red-700 p-6">
          API did not return an array.<br />
          Raw data: <pre>{JSON.stringify(recipes, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-teal-400 pb-20 overflow-x-hidden">
      {svgPath}

      <div className="flex flex-col items-center pt-8 gap-16 relative z-10">
        {recipes.map((recipe, i) => (
          <RecipeNode
            key={recipe.id}
            recipe={recipe}
            selected={selected && selected.id === recipe.id}
            onClick={() => setSelected(recipe)}
            style={{
              marginLeft: i % 2 === 0 ? "0" : "40px", // simple zigzag
            }}
          />
        ))}
        {recipes.length === 0 && (
          <div className="text-lg text-white font-bold">No recipes found for this meal.</div>
        )}
      </div>

      {selected && (
        <RecipeInfoCallout recipe={selected} onClose={() => setSelected(null)} />
      )}

      <BottomNav />
    </div>
  );
}
