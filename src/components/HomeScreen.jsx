import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleBreakfastClick = () => {
    navigate("/breakfast");
  };

  const handlePlaceholderClick = (questType) => {
    console.log(`${questType} clicked - placeholder handler`);
  };

  return (
    <div className="w-full h-screen bg-[#F6DFBC] relative overflow-hidden max-w-[375px] mx-auto">
      {/* Welcome Text */}
      <div className="absolute left-[14px] top-[65px] w-[375px] h-[42px]">
        <span className="text-black font-nunito text-[28px] font-normal leading-[36px]">
          Welcome :)
        </span>
      </div>

      {/* Let's cook! Text */}
      <div className="absolute left-[14px] top-[109px] w-[375px] h-[42px]">
        <span className="text-black font-nunito text-[35px] font-bold leading-[36px]">
          Let's cook!
        </span>
      </div>

      {/* Mascot Character */}
      <img
        src="/assets/homescreen/spatch-full-body.png"
        alt="Spatch mascot"
        className="absolute left-[183px] top-[30px] w-[189px] h-[222px] object-contain"
      />

      {/* Breakfast Quests Button */}
      <div className="absolute left-[18px] top-[180px] w-[152px] h-[192px]">
        <button
          onClick={handleBreakfastClick}
          className="w-full h-full rounded-[20px] bg-[#EE9464] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src="/assets/homescreen/breakfast-icon.png"
            alt="Breakfast icon"
            className="w-[103px] h-[92px] object-contain mb-2"
          />
          <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
            Breakfast<br />Quests
          </div>
        </button>
      </div>

      {/* Lunch Quests Button */}
      <div className="absolute left-[202px] top-[180px] w-[152px] h-[188px]">
        <button
          onClick={() => handlePlaceholderClick("Lunch")}
          className="w-full h-full rounded-[20px] bg-[#F89921] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src="/assets/homescreen/lunch-icon.png"
            alt="Lunch icon"
            className="w-[133px] h-[102px] object-contain mb-2"
          />
          <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
            LunchQuests
          </div>
        </button>
      </div>

      {/* Dinner Quests Button */}
      <div className="absolute left-[18px] top-[420px] w-[152px] h-[192px]">
        <button
          onClick={() => handlePlaceholderClick("Dinner")}
          className="w-full h-full rounded-[20px] bg-[#4FB9B0] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src="/assets/homescreen/dinner-icon.png"
            alt="Dinner icon"
            className="w-[103px] h-[92px] object-contain mb-2"
          />
          <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
            DinnerQuests
          </div>
        </button>
      </div>

      {/* Dessert Quests Button */}
      <div className="absolute left-[202px] top-[420px] w-[152px] h-[192px]">
        <button
          onClick={() => handlePlaceholderClick("Dessert")}
          className="w-full h-full rounded-[20px] bg-[#FFCB63] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src="/assets/homescreen/dessert-icon.png"
            alt="Dessert icon"
            className="w-[123px] h-[110px] object-contain mb-2"
          />
          <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
            Dessert<br />Quests
          </div>
        </button>
      </div>

      {/* Special Quests Button - Full Width */}
      <div className="absolute left-[56px] top-[632px] w-[256px] h-[110px]">
        <button
          onClick={() => handlePlaceholderClick("Special")}
          className="w-full h-full rounded-[20px] bg-[#F89921] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-row items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <img
            src="/assets/homescreen/chef-icon.png"
            alt="Chef icon"
            className="w-[87px] h-[88px] object-contain mr-4"
          />
          <img
            src="/assets/homescreen/castle-icon.png"
            alt="Castle icon"
            className="w-[83px] h-[81px] object-contain mr-4"
          />
          <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px]">
            Special Quests
          </div>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute left-0 top-[759px] w-[376px] h-[53px]">
        <div className="w-full h-full rounded-[10px] border-2 border-[#DBAB4B] bg-[#FFCB63] flex items-center justify-around">
          {/* Home Icon */}
          <button className="flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
            <img
              src="/assets/home.png"
              alt="Home"
              className="w-[29px] h-[30px] object-contain"
            />
          </button>

          {/* Profile Icon */}
          <button className="flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
            <img
              src="/assets/profile.png"
              alt="Profile"
              className="w-[38px] h-[38px] object-contain"
            />
          </button>

          {/* Leaderboard Icon with Stars */}
          <button className="relative flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
            <img
              src="/assets/leaderboard.png"
              alt="Profile"
              className="w-[38px] h-[38px] object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
