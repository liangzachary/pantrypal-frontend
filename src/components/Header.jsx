// Header.jsx
import React from "react";

export default function Header({ 
  level = 30, 
  starsNeeded = "0/50 stars needed", 
  currency = 300, 
  stars = 564,
  currencyIcon = "https://api.builder.io/api/v1/image/assets/TEMP/9f896995be42eec1cd87f110390f93655a10f69a?placeholderIfAbsent=true",
  starIcon = "https://api.builder.io/api/v1/image/assets/TEMP/94a438b76915c1a1c27b1f82f970ca92ff159843?placeholderIfAbsent=true"
}) {
  return (
    <div className="flex z-10 gap-2 sm:gap-5 justify-between px-4 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-xs text-black bg-amber-300 border border-solid border-stone-400">
      <div className="flex gap-1.5 sm:gap-2.5 my-auto">
        <div className="font-bold">
          Level {level}{" "}
        </div>
        <div className="basis-auto hidden xs:block sm:block">
          {starsNeeded}
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 text-center whitespace-nowrap">
        <div className="flex gap-1 sm:gap-1.5 my-auto">
          <img
            src={currencyIcon}
            className="object-contain shrink-0 w-4 sm:w-5 aspect-square"
            alt="Currency icon"
          />
          <div className="my-auto text-xs sm:text-xs">
            {currency}
          </div>
        </div>
        <div className="flex gap-0.5 sm:gap-1">
          <img
            src={starIcon}
            className="object-contain shrink-0 aspect-square w-5 sm:w-[26px]"
            alt="Star icon"
          />
          <div className="my-auto text-xs sm:text-xs">
            {stars}
          </div>
        </div>
      </div>
    </div>
  );
}
