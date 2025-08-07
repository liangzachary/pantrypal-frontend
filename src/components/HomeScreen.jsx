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
        src="/assets/spatch-full-body.png"
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
            src="/assets/breakfast-icon.png"
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
            src="/assets/lunch-icon.png"
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
            src="/assets/dinner-icon.png"
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
            src="/assets/dessert-icon.png"
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
            src="/assets/chef-icon.png"
            alt="Chef icon"
            className="w-[87px] h-[88px] object-contain mr-4"
          />
          <img
            src="/assets/castle-icon.png"
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
              src="/assets/home-nav-icon.png"
              alt="Home"
              className="w-[29px] h-[30px] object-contain"
            />
          </button>

          {/* Profile Icon */}
          <button className="flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
            <img
              src="/assets/profile-nav-icon.png"
              alt="Profile"
              className="w-[38px] h-[38px] object-contain"
            />
          </button>

          {/* Leaderboard Icon with Stars */}
          <button className="relative flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
            {/* Star decorations */}
            <div className="absolute inset-0">
              {/* Top star */}
              <svg
                className="absolute left-[10px] top-0 w-[11px] h-[10px] stroke-black"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.51843 1.60754C2.67032 1.15159 3.33432 1.15159 3.48621 1.60754C3.68823 2.2145 4.25922 2.63782 4.9071 2.63782H4.94812C5.41777 2.63784 5.61031 3.241 5.22742 3.51282C4.69487 3.89052 4.47283 4.57238 4.67859 5.19055C4.83004 5.6457 4.31282 6.01958 3.93152 5.74915L3.87 5.70618C3.35021 5.33753 2.65442 5.33753 2.13464 5.70618L2.07312 5.74915C1.69182 6.01958 1.1746 5.6457 1.32605 5.19055C1.53181 4.57238 1.30977 3.89052 0.777222 3.51282C0.394316 3.241 0.586862 2.63783 1.05652 2.63782H1.09753C1.74542 2.63782 2.31641 2.2145 2.51843 1.60754Z"
                  stroke="black"
                />
              </svg>
              {/* Left star */}
              <svg
                className="absolute left-0 top-[13px] w-[11px] h-[10px] stroke-black"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.56714 1.35754C2.71903 0.901595 3.38302 0.901594 3.53491 1.35754C3.73694 1.9645 4.30793 2.38782 4.95581 2.38782H4.99683C5.46648 2.38784 5.65902 2.991 5.27612 3.26282C4.74357 3.64052 4.52154 4.32238 4.72729 4.94055C4.87874 5.3957 4.36153 5.76958 3.98022 5.49915L3.9187 5.45618C3.39892 5.08753 2.70313 5.08753 2.18335 5.45618L2.12183 5.49915C1.74052 5.76958 1.22331 5.3957 1.37476 4.94055C1.58051 4.32238 1.35848 3.64052 0.825928 3.26282C0.443022 2.991 0.635568 2.38783 1.10522 2.38782H1.14624C1.79412 2.38782 2.36512 1.9645 2.56714 1.35754Z"
                  stroke="black"
                />
              </svg>
              {/* Right star */}
              <svg
                className="absolute left-[21px] top-[7px] w-[11px] h-[10px] stroke-black"
                width="7"
                height="6"
                viewBox="0 0 7 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.09164 0.89325C3.24353 0.437301 3.90753 0.437299 4.05942 0.89325C4.26144 1.50021 4.83243 1.92352 5.48032 1.92352H5.52133C5.99098 1.92355 6.18352 2.52671 5.80063 2.79852C5.26808 3.17623 5.04604 3.85808 5.2518 4.47626C5.40325 4.9314 4.88603 5.30529 4.50473 5.03485L4.44321 4.99188C3.92343 4.62323 3.22764 4.62323 2.70786 4.99188L2.64633 5.03485C2.26503 5.30529 1.74781 4.9314 1.89926 4.47626C2.10502 3.85808 1.88298 3.17623 1.35043 2.79852C0.967528 2.52671 1.16007 1.92354 1.62973 1.92352H1.67075C2.31863 1.92352 2.88962 1.50021 3.09164 0.89325Z"
                  stroke="black"
                />
              </svg>
              {/* Rating bars */}
              <div className="absolute left-[10px] top-[10px] w-[11px] h-[22px] border-[1.5px] border-black bg-transparent"></div>
              <div className="absolute left-[19px] top-[18px] w-[10px] h-[14px] border-[1.5px] border-black bg-transparent"></div>
              <div className="absolute left-[2px] top-[23px] w-[8px] h-[9px] border-[1.5px] border-black bg-transparent"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
