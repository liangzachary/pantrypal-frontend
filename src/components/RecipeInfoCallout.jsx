import React from "react";

export default function RecipeInfoCallout({ recipe, onClose }) {
  return (
    <div className="fixed left-4 right-4 bottom-24 z-20 bg-white/95 rounded-xl p-4 shadow-xl animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg">{recipe.name}</div>
        <button className="text-gray-400 text-2xl" onClick={onClose}>&times;</button>
      </div>
      <div className="mb-2">You will need: <b>{recipe.needed}</b></div>
      <a
        href={recipe.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-red-500 text-white rounded px-4 py-2 text-center font-semibold mb-2"
      >
        Buy on Amazon Fresh
      </a>
      <div className="text-gray-600 text-sm">{recipe.desc}</div>
    </div>
  );
}
