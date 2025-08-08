import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavNode from "./BottomNavNode";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFloating, setIsFloating] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const barRef = useRef(null);
  const [dockHeight, setDockHeight] = useState(64); // measured docked height

  // Measure the bar height (especially in its DOCKED state) and set --nav-height
  useEffect(() => {
    const measure = () => {
      if (!barRef.current) return;
      const h = Math.ceil(barRef.current.getBoundingClientRect().height || 64);
      setDockHeight(h);
      // <-- This is the bit you asked about
      document.documentElement.style.setProperty(
        "--nav-height",
        `calc(${h}px + env(safe-area-inset-bottom, 0px))`
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isFloating]); // re-measure if we change between floating/docked

  // Reserve space only when the page is NOT scrollable
  useEffect(() => {
    const value = isScrollable
      ? "0px"
      : `calc(${dockHeight}px + env(safe-area-inset-bottom, 0px))`;
    document.documentElement.style.setProperty("--nav-reserve", value);
    return () => {
      document.documentElement.style.setProperty("--nav-reserve", "0px");
    };
  }, [isScrollable, dockHeight]);

  // Detect scrollability + toggle floating
  useEffect(() => {
    const getDelta = () =>
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const checkScrollable = () => setIsScrollable(getDelta() > 16);

    const handleScroll = () => {
      if (!isScrollable) {
        setIsFloating(false);
        return;
      }
      const y = window.scrollY;
      const nearTop = y < 24;
      const nearBottom =
        y + window.innerHeight >
        document.documentElement.scrollHeight - 24;

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

  // Reset float + re-evaluate on route change
  useEffect(() => {
    setIsFloating(false);
    const rAF = requestAnimationFrame(() => {
      const delta =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setIsScrollable(delta > 16);
    });
    return () => cancelAnimationFrame(rAF);
  }, [location.pathname]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] transition-all duration-300
        ${isFloating ? "bottom-3" : "bottom-0"}
      `}
    >
      <div
        ref={barRef}
        className={
          `flex justify-around items-center transition-all duration-300 w-full ` +
          (isFloating
            ? "bg-amber-300 rounded-2xl shadow-lg py-4 px-6 border-2 border-orange-400" // floating
            : "bg-amber-300 rounded-none shadow-none py-5 px-0 border-t-2 border-orange-400 border-b-0" // docked
          )
        }
        style={
          !isFloating
            ? { paddingBottom: "env(safe-area-inset-bottom, 0px)" }
            : undefined
        }
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
