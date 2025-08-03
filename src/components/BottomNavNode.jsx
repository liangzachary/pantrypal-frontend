// BottomNavNode.jsx
import React from "react";

export default function BottomNavNode({ src, alt, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`object-contain shrink-0 transition-all duration-200 ease-in-out hover:scale-125 hover:z-10 active:scale-110 cursor-pointer ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-all duration-200 ease-in-out hover:drop-shadow-lg"
      />
    </button>
  );
}
