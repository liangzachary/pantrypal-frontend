import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

// Helper to render stars (kept in case you need it later)
function Stars({ difficulty }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 38,
            color: i < difficulty ? "#FFCA08" : "#222",
            filter: i < difficulty ? "drop-shadow(0px 2px 4px #FC0)" : "none",
            marginRight: i < 2 ? 2 : 0,
            lineHeight: "1",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// Tooltip card (for locked nodes only)
function TooltipCard({ recipe, mouse }) {
  if (!recipe) return null;
  return (
    <div
      className="z-[99] fixed"
      style={{
        left: mouse.x,
        top: mouse.y - 18,
        transform: "translate(-50%,-100%)",
        background: "#ececec",
        color: "#222",
        borderRadius: 16,
        boxShadow: "0 4px 24px 0 #1115",
        padding: "18px 22px 14px 22px",
        minWidth: 270,
        maxWidth: 340,
        pointerEvents: "auto",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 20,
          textAlign: "center",
          padding: 12,
        }}
      >
        Finish the previous recipe to unlock this one
      </div>
    </div>
  );
}

export default function BreakfastRoute({ isAdmin }) {
  const navigate = useNavigate();
  const [tooltipIdx, setTooltipIdx] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // ref to ensure we scroll after the map image is laid out
  const mapRef = useRef(null);

  // Auto-scroll to bottom on first mount
  useEffect(() => {
    const scrollToBottom = () => {
      // instant jump; change to "smooth" if you prefer the animation
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    };

    if (mapRef.current?.complete) {
      // image already loaded (from cache)
      requestAnimationFrame(scrollToBottom);
    } else if (mapRef.current) {
      // wait for image load
      const onLoad = () => {
        requestAnimationFrame(scrollToBottom);
        mapRef.current?.removeEventListener("load", onLoad);
      };
      mapRef.current.addEventListener("load", onLoad);
      // safety fallback in case the load event is missed
      const id = setTimeout(scrollToBottom, 400);
      return () => {
        clearTimeout(id);
        mapRef.current?.removeEventListener("load", onLoad);
      };
    }
  }, []);

  const foodImages = [
    { src: "/assets/food/breakfast1.png", style: { top: "90%", left: "26%", width: 160, height: 160 }, recipeId: 2 },
    { src: "/assets/food/breakfast2.png", style: { top: "84%", left: "75%", width: 120, height: 120 }, recipeId: 3 },
    { src: "/assets/food/breakfast3.png", style: { top: "70%", left: "25%", width: 130, height: 130 }, recipeId: 4 },
    { src: "/assets/food/breakfast4.png", style: { top: "63%", left: "80%", width: 140, height: 140 }, recipeId: 5 },
    { src: "/assets/food/breakfast5.png", style: { top: "55%", left: "20%", width: 120, height: 120 }, recipeId: 6 },
    { src: "/assets/food/breakfast6.png", style: { top: "44%", left: "80%", width: 120, height: 120 }, recipeId: 7 },
    { src: "/assets/food/breakfast7.png", style: { top: "34%", left: "40%", width: 130, height: 130 }, recipeId: 8 },
    { src: "/assets/food/breakfast8.png", style: { top: "24%", left: "70%", width: 135, height: 135 }, recipeId: 9 },
    { src: "/assets/food/breakfast9.png", style: { top: "13.5%", left: "35%", width: 130, height: 130 }, recipeId: 10 },
    { src: "/assets/food/breakfast10.png", style: { top: "2.5%", left: "70%", width: 160, height: 160 }, recipeId: 11 },
  ];

  const unlocked = isAdmin
    ? foodImages.map((f) => f.recipeId)
    : [foodImages[0].recipeId];

  useEffect(() => {
    fetch("https://spatch.onrender.com/recipes/")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(
          data.map((r) => ({
            ...r,
            ingredients:
              typeof r.ingredients === "string"
                ? JSON.parse(r.ingredients)
                : r.ingredients,
            kitchenware:
              typeof r.kitchenware === "string"
                ? JSON.parse(r.kitchenware)
                : r.kitchenware,
            steps:
              typeof r.steps === "string" ? JSON.parse(r.steps) : r.steps,
          }))
        );
      });
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (
        tooltipIdx !== null &&
        !e.target.classList.contains("locked-food-img")
      ) {
        setTooltipIdx(null);
      }
    }
    if (tooltipIdx !== null) {
      window.addEventListener("mousedown", onClickOutside);
    }
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [tooltipIdx]);

  const lockedStyle = {
    imageRendering: "pixelated",
    filter: "blur(6px)",
    pointerEvents: "auto",
  };

  const renderTooltip = (recipeId) => {
    if (tooltipIdx !== recipeId) return null;
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return null;
    return <TooltipCard recipe={recipe} mouse={mouse} />;
  };

  function handleFoodClick(recipeId, isUnlocked) {
    if (!isUnlocked) return;
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) setSelectedRecipe(recipe);
  }

  return (
    <div className="mx-auto w-full bg-stone-200 max-w-[480px] min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="w-full flex flex-col sticky top-0 z-50">
        <div className="w-full z-10 bg-white">
          <Header
            level={30}
            starsNeeded="0/50 stars needed"
            currency={300}
            stars={1604}
          />
        </div>
        <div className="w-full flex items-center justify-center bg-teal-400 py-3 border-b-2 border-stone-300 z-10">
          <span
            className="text-2xl sm:text-3xl text-amber-100 tracking-widest font-bold"
            style={{ fontFamily: "ComicCAT, sans-serif" }}
          >
            BREAKFAST ROUTE
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center w-full">
        <img
          ref={mapRef}
          src="/assets/draft-justtrack.png"
          className="w-full h-auto border-2 border-stone-400 block -mt-3"
          alt="Breakfast route map"
        />

        {foodImages.map((img, i) => {
          const isUnlocked = unlocked.includes(img.recipeId);
          return (
            <React.Fragment key={img.src}>
              <img
                src={img.src}
                alt={`Food ${i + 1}`}
                className={
                  "absolute -translate-x-1/2 transition-transform duration-200 ease-in-out cursor-pointer" +
                  (isUnlocked
                    ? " hover:scale-110 active:scale-95"
                    : " opacity-80 locked-food-img")
                }
                style={{
                  ...img.style,
                  ...(isUnlocked ? {} : lockedStyle),
                }}
                onMouseEnter={(e) => {
                  if (!isUnlocked) {
                    setTooltipIdx(img.recipeId);
                    setMouse({ x: e.clientX, y: e.clientY });
                  }
                }}
                onMouseMove={(e) => {
                  if (!isUnlocked && tooltipIdx === img.recipeId) {
                    setMouse({ x: e.clientX, y: e.clientY });
                  }
                }}
                onMouseLeave={() => {
                  if (!isUnlocked) setTooltipIdx(null);
                }}
                onClick={(e) => {
                  if (isUnlocked) {
                    handleFoodClick(img.recipeId, isUnlocked);
                  } else {
                    e.stopPropagation();
                    setTooltipIdx(img.recipeId);
                  }
                }}
                draggable={false}
              />
              {!isUnlocked && renderTooltip(img.recipeId)}
            </React.Fragment>
          );
        })}

        {selectedRecipe && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedRecipe(null)}
            style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <div
              className="bg-gray-200 rounded-xl shadow-lg p-5 min-w-[280px] max-w-xs relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-3 right-3 text-2xl font-bold text-black/60 hover:text-black"
                aria-label="Close"
              >
                &times;
              </button>
              <div className="text-2xl font-bold text-center mb-0">
                {selectedRecipe.nickname}
              </div>
              <div className="text-md text-center mb-3 text-gray-700 -mt-1">
                {selectedRecipe.real_name}
              </div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(selectedRecipe.difficulty)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/star_filled.png"
                    alt="star"
                    className="w-8 h-8"
                  />
                ))}
                {[...Array(3 - selectedRecipe.difficulty)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/star_outline.png"
                    alt="star"
                    className="w-8 h-8"
                  />
                ))}
              </div>
              <div className="text-center mb-3 text-gray-700">
                {selectedRecipe.difficulty === 1
                  ? "Beginner"
                  : selectedRecipe.difficulty === 2
                  ? "Intermediate"
                  : "Advanced"}
              </div>
              <div className="font-bold mb-0 mt-2">Ingredients:</div>
              <ul className="mb-4 pl-4 text-left text-[16px]">
                {selectedRecipe.ingredients.map((item, i) => (
                  <li key={i}>&#8226; {item}</li>
                ))}
              </ul>
              <div className="font-bold mb-0 mt-2">Kitchenware:</div>
              <ul className="mb-4 pl-4 text-left text-[16px]">
                {selectedRecipe.kitchenware.map((item, i) => (
                  <li key={i}>&#8226; {item}</li>
                ))}
              </ul>
              <div className="mb-2 text-gray-700">
                <span className="font-bold">Time:</span>{" "}
                {selectedRecipe.time} min &nbsp;
                <span className="font-bold">Servings:</span>{" "}
                {selectedRecipe.servings}
              </div>
              <button
                className="w-full rounded bg-lime-400 hover:bg-lime-500 text-black text-[17px] font-semibold py-2 mb-2 transition"
                onClick={() =>
                  window.open(
                    "https://www.amazon.com/s?k=" +
                      encodeURIComponent(selectedRecipe.ingredients.join(",")),
                    "_blank"
                  )
                }
              >
                Buy on Amazon Fresh
              </button>
              <button
                className="w-full rounded bg-orange-400 hover:bg-orange-500 text-black text-[17px] font-semibold py-2"
                onClick={() => navigate(`/recipe/${selectedRecipe.id}`)}
              >
                Start cooking!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
