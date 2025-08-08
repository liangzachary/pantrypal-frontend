import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();

  // Base design size (your current absolute coords are built for this)
  const BASE_W = 375;
  const BASE_H = 812;

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(BASE_H);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      // Width available to us (cap at 480 to match BreakfastRoute)
      const available = Math.min(containerRef.current.clientWidth, 480);
      const nextScale = available / BASE_W; // proportional scale from 375 => 480
      setScale(nextScale);
      setScaledHeight(Math.round(BASE_H * nextScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleBreakfastClick = () => navigate("/breakfast");
  const handlePlaceholderClick = (q) => console.log(`${q} clicked - placeholder handler`);

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto bg-[#F6DFBC] min-h-screen relative overflow-hidden max-w-[480px]"
    >
      {/* Layout spacer: this makes the page reserve the scaled height so BottomNav doesn't overlap */}
      <div style={{ height: scaledHeight }} />

      {/* Scaled design canvas */}
      <div
        className="absolute left-1/2 top-0"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* --- Your existing absolute-positioned content below --- */}

        {/* Welcome Text */}
        <div className="absolute left-[14px] top-[65px]">
          <span className="text-black font-nunito text-[28px] font-normal leading-[36px]">
            Welcome :)
          </span>
        </div>

        {/* Let's cook! Text */}
        <div className="absolute left-[14px] top-[109px]">
          <span className="text-black font-nunito text-[35px] font-bold leading-[36px]">
            Let's cook!
          </span>
        </div>

        {/* Mascot Character */}
        <img
          src="/assets/homepage/spatch-full-body.png"
          alt="Spatch mascot"
          className="absolute left-[183px] top-[30px] w-[189px] h-[222px] object-contain"
        />

        {/* Breakfast Quests */}
        <div className="absolute left-[18px] top-[180px] w-[152px] h-[192px]">
          <button
            onClick={handleBreakfastClick}
            className="w-full h-full rounded-[20px] bg-[#EE9464] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img
              src="/assets/homepage/breakfast-icon.png"
              alt="Breakfast icon"
              className="w-[103px] h-[92px] object-contain mb-2"
            />
            <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
              Breakfast<br />Quests
            </div>
          </button>
        </div>

        {/* Lunch Quests */}
        <div className="absolute left-[202] top-[180px] w-[152px] h-[188px]">
          <button
            onClick={() => handlePlaceholderClick("Lunch")}
            className="w-full h-full rounded-[20px] bg-[#F89921] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img
              src="/assets/homepage/lunch-icon.png"
              alt="Lunch icon"
              className="w-[133px] h-[102px] object-contain mb-2"
            />
            <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
              Lunch<br />Quests
            </div>
          </button>
        </div>

        {/* Dinner Quests */}
        <div className="absolute left-[18px] top-[420px] w-[152px] h-[192px]">
          <button
            onClick={() => handlePlaceholderClick("Dinner")}
            className="w-full h-full rounded-[20px] bg-[#4FB9B0] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img
              src="/assets/homepage/dinner-icon.png"
              alt="Dinner icon"
              className="w-[103px] h-[92px] object-contain mb-2"
            />
            <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
              Dinner<br />Quests
            </div>
          </button>
        </div>

        {/* Dessert Quests */}
        <div className="absolute left-[202px] top-[420px] w-[152px] h-[192px]">
          <button
            onClick={() => handlePlaceholderClick("Dessert")}
            className="w-full h-full rounded-[20px] bg-[#FFCB63] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img
              src="/assets/homepage/dessert-icon.png"
              alt="Dessert icon"
              className="w-[123px] h-[110px] object-contain mb-2"
            />
            <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px] px-2">
              Dessert<br />Quests
            </div>
          </button>
        </div>

        {/* Special Quests */}
        <div className="absolute left-[56px] top-[632px] w-[256px] h-[110px]">
          <button
            onClick={() => handlePlaceholderClick("Special")}
            className="w-full h-full rounded-[20px] bg-[#F89921] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] flex flex-row items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img
              src="/assets/homepage/chef-icon.png"
              alt="Chef icon"
              className="w-[88px] h-[88px] object-contain mr-4"
            />
            <img
              src="/assets/homepage/castle-icon.png"
              alt="Castle icon"
              className="w-[83px] h-[81px] object-contain mr-4"
            />
            <div className="text-black text-center font-nunito text-[20px] font-bold leading-[21px]">
              Special<br />Quests
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
