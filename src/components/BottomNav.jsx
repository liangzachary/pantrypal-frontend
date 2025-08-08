import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavNode from "./BottomNavNode";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFloating, setIsFloating] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const getDelta = () =>
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const checkScrollable = () => {
      // require a bit of room to count as scrollable to avoid subpixel gaps
      setIsScrollable(getDelta() > 16);
    };

    const handleScroll = () => {
      if (!isScrollable) {
        setIsFloating(false);
        return;
      }
      const y = window.scrollY;
      const nearTop = y < 24;
      const nearBottom =
        y + window.innerHeight > document.documentElement.scrollHeight - 24;

      // float only when actually scrolling and not near edges
      setIsFloating(!nearTop && !nearBottom);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkScrollable);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollable]);

  // Reset float on route change & re-check scrollability
  useEffect(() => {
    setIsFloating(false);
    // force a scrollability recheck on new pages
    const rAF = requestAnimationFrame(() => {
      const delta = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setIsScrollable(delta > 16);
    });
    return () => cancelAnimationFrame(rAF);
  }, [location.pathname]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] transition-all duration-300
        ${isFloating ? "bottom-3" : "bottom-0"}  /* <— DOCKED vs FLOATING position */
      `}
    >
      <div
        className={
          `flex justify-around items-center transition-all duration-300 w-full ` +
          (
            isFloating
              // FLOATING: rounded, shadow, full border, inner padding
              ? "bg-amber-300 rounded-2xl shadow-lg py-4 px-6 border-2 border-orange-400"
              // DOCKED: flat edges, no shadow, no bottom border, no outer padding
              : "bg-amber-300 rounded-none shadow-none py-5 px-0 border-t-2 border-orange-400 border-b-0"
          )
        }
        // iOS safe area handled only when docked (so it sits flush)
        style={!isFloating ? { paddingBottom: "env(safe-area-inset-bottom, 0px)" } : undefined}
      >
        <BottomNavNode
          src="/assets/home.png"
          alt="Home"
          onClick={() => navigate("/")}
          className="aspect-[0.97] w-[24px] sm:w-[31px]"
        />
        <BottomNavNode
          src="/assets/profile.png"
          alt="Profile"
          onClick={() => navigate("/profile")}
          className="w-8 sm:w-10 aspect-square"
        />
        <BottomNavNode
          src="/assets/leaderboard.png"
          alt="Leaderboard"
          onClick={() => navigate("/leaderboard")}
          className="aspect-[0.97] w-[26px] sm:w-[33px]"
        />
      </div>
    </div>
  );
}
