import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom"; // Add this!

export default function BreakfastRoute() {
  const [atBottom, setAtBottom] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  // Only breakfast1 is unlocked unless admin
  const [unlocked] = useState([1]);

  const handleFoodClick = (foodType) => {
    console.log(`Clicked on ${foodType}`);
  };

  useEffect(() => {
    function onScroll() {
      const scrollPos = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - 60;
      setAtBottom(scrollPos >= bottom);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide tooltip when clicking outside (but NOT when clicking the locked food image itself)
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

  const foodImages = [
    { src: "/assets/food/breakfast1.png", style: { top: '90%', left: '26%', width: 160, height: 160 } },
    { src: "/assets/food/breakfast2.png", style: { top: '84%', left: '75%', width: 120, height: 120 } },
    { src: "/assets/food/breakfast3.png", style: { top: '70%', left: '25%', width: 130, height: 130 } },
    { src: "/assets/food/breakfast4.png", style: { top: '63%', left: '80%', width: 140, height: 140 } },
    { src: "/assets/food/breakfast5.png", style: { top: '55%', left: '20%', width: 120, height: 120 } },
    { src: "/assets/food/breakfast6.png", style: { top: '44%', left: '80%', width: 120, height: 120 } },
    { src: "/assets/food/breakfast7.png", style: { top: '34%', left: '40%', width: 130, height: 130 } },
    { src: "/assets/food/breakfast8.png", style: { top: '24%', left: '70%', width: 135, height: 135 } },
    { src: "/assets/food/breakfast9.png", style: { top: '13.5%', left: '35%', width: 130, height: 130 } },
    { src: "/assets/food/breakfast10.png", style: { top: '2.5%', left: '70%', width: 160, height: 160 } },
  ];

  // Tooltip for locked
  const renderTooltip = (recipeNum) => {
    if (tooltipIdx !== recipeNum) return null;
    return (
      <div
        className="pointer-events-none z-[99] fixed transition-all duration-75 text-base"
        style={{
          left: mouse.x,
          top: mouse.y - 38,
          transform: "translate(-50%,-100%)",
          background: "#111",
          color: "#fff",
          borderRadius: 8,
          padding: "7px 18px",
          fontWeight: 600,
          boxShadow: "0 4px 16px 0 #111b",
          whiteSpace: "nowrap",
          fontSize: "1rem",
        }}
      >
        You haven't unlocked this recipe yet
      </div>
    );
  };

  // Admin login
  function handleAdminLogin() {
    const pw = window.prompt("Admin password?");
    if (pw === "letmein") setIsAdmin(true); // CHANGE THIS PASSWORD!
    else if (pw) alert("Wrong password.");
  }

  return (
    <div className="mx-auto w-full bg-stone-200 max-w-[480px] min-h-screen flex flex-col relative">
      {/* Header area with 2 bars */}
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
            style={{ fontFamily: 'ComicCAT, sans-serif' }}
          >
            BREAKFAST ROUTE
          </span>
        </div>
      </div>

      {/* Admin circle button */}
      {!isAdmin && (
        <button
          className="fixed z-50 bottom-28 right-6 bg-white shadow-lg border border-stone-400 rounded-full w-11 h-11 flex items-center justify-center text-lg font-bold hover:bg-yellow-300 transition"
          title="Admin Login"
          onClick={handleAdminLogin}
          style={{ boxShadow: "0 2px 8px #2224" }}
        >
          <span role="img" aria-label="lock">🔒</span>
        </button>
      )}
      {isAdmin && (
        <div className="fixed z-50 bottom-28 right-6 bg-lime-400 rounded-full w-11 h-11 flex items-center justify-center text-lg font-bold border-2 border-lime-700 shadow-lg">
          <span role="img" aria-label="admin">🛠️</span>
        </div>
      )}

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col items-center w-full">
        {/* Route map */}
        <img
          src="/assets/draft-justtrack.png"
          className="w-full h-auto border-2 border-stone-400 block -mt-3"
          alt="Breakfast route map"
        />

        {/* Food images */}
        {foodImages.map((img, i) => {
          const recipeNum = i + 1;
          const isUnlocked = isAdmin || unlocked.includes(recipeNum);
          return (
            <React.Fragment key={img.src}>
              {isUnlocked ? (
                <Link to={`/recipe/${recipeNum}`}>
                  <img
                    src={img.src}
                    alt={`Food ${recipeNum}`}
                    className="absolute -translate-x-1/2 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110 active:scale-95"
                    style={img.style}
                    draggable={false}
                  />
                </Link>
              ) : (
                <img
                  src={img.src}
                  alt={`Food ${recipeNum}`}
                  className="absolute -translate-x-1/2 transition-transform duration-200 ease-in-out cursor-pointer opacity-80 locked-food-img"
                  style={{ ...img.style, ...lockedStyle }}
                  onMouseEnter={e => {
                    setTooltipIdx(recipeNum);
                    setMouse({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={e => {
                    if (tooltipIdx === recipeNum) setMouse({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setTooltipIdx(null)}
                  onClick={e => {
                    // just show tooltip
                    e.stopPropagation();
                    setTooltipIdx(recipeNum);
                  }}
                  draggable={false}
                  data-locked="true"
                />
              )}
              {!isUnlocked && renderTooltip(recipeNum)}
            </React.Fragment>
          );
        })}
      </div>

      {/* Spacer (h-20 kept as requested) */}
      <div className="h-20"></div>

      {/* Bottom nav ... (unchanged) */}
      <div
        className={`fixed z-40 left-1/2 -translate-x-1/2 max-w-[480px] w-[95vw] transition-all duration-300 ease-in-out ${
          atBottom ? "bottom-0 rounded-none" : "bottom-3 rounded-2xl"
        }`}
      >
        <div
          className={
            "w-full flex justify-around items-center bg-amber-300 border-2 border-orange-400 shadow-lg transition-all duration-300 ease-in-out " +
            (atBottom
              ? "rounded-none py-7 px-0"
              : "rounded-2xl py-4 px-6")
          }
        >
          <img
            src="/assets/home.png"
            alt="Home"
            onClick={() => handleFoodClick("home")}
            className="aspect-[0.97] w-[24px] sm:w-[31px] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
          />
          <img
            src="/assets/profile.png"
            alt="Profile"
            onClick={() => handleFoodClick("profile")}
            className="w-8 sm:w-10 aspect-square cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
          />
          <img
            src="/assets/leaderboard.png"
            alt="Leaderboard"
            onClick={() => handleFoodClick("leaderboard")}
            className="aspect-[0.97] w-[26px] sm:w-[33px] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
}
