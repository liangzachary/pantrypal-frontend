import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavNode from "./BottomNavNode";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFloating, setIsFloating] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  // Detect scroll and if page is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      const scrollable =
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight;
      setIsScrollable(scrollable);
    };

    const handleScroll = () => {
      if (!isScrollable) {
        setIsFloating(false);
        return;
      }
      const scrollBottom =
        window.innerHeight + window.scrollY <
        document.body.offsetHeight - 60;
      setIsFloating(scrollBottom);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScrollable);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollable]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] transition-all duration-300
        ${isFloating ? "bottom-3" : "bottom-0"}
      `}
    >
      <div
        className={`flex justify-around items-center border-2 border-orange-400 shadow-lg transition-all duration-300
          ${isFloating
            ? "bg-amber-300 rounded-2xl py-4 px-6"
            : "bg-amber-300 rounded-none py-5 px-0"
          }
        `}
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
