// components/BottomNav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavNode from "./BottomNavNode";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed z-40 left-1/2 -translate-x-1/2 bottom-3 w-[95vw] max-w-[480px] px-2"
    >
      <div className="flex justify-around items-center bg-amber-300 rounded-2xl border-2 border-orange-400 shadow-lg py-4 px-6">
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
