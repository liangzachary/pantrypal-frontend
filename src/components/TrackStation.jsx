// TrackStation.jsx
import React from "react";

export default function TrackStation({ 
  onClick, 
  stationId, 
  className = "",
  style = {} 
}) {
  const handleClick = () => {
    console.log(`Clicked on station ${stationId}`);
    if (onClick) onClick(stationId);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-transparent border-2 border-transparent hover:border-yellow-400 hover:bg-yellow-200 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer z-10 ${className}`}
      style={style}
      aria-label={`Route station ${stationId}`}
    >
      <div className="w-full h-full rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200" />
    </button>
  );
}
