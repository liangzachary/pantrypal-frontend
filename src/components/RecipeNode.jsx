import React from "react";

export default function RecipeNode({ recipe, selected, onClick, style }) {
  return (
    <div className="flex flex-col items-center relative" style={style}>
      <button
        onClick={onClick}
        className={`w-24 h-24 rounded-full border-4 border-red-400 shadow-md bg-white flex items-center justify-center
          transition ring-2 ${selected ? "ring-yellow-400 scale-110" : "ring-transparent"}
        `}
      >
        {recipe.imgUrl
          ? <img src={recipe.imgUrl} alt={recipe.name} className="w-20 h-20 object-cover rounded-full" />
          : <div className="w-20 h-20 rounded-full bg-gray-300" />}
      </button>
      <div className="text-center text-base mt-2 font-medium text-black drop-shadow">{recipe.name}</div>
    </div>
  );
}
