import React from "react";
import { useNavigate } from "react-router-dom";

export default function RewardScreen() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/breakfast");
  };

  return (
    <div
      className="max-w-[480px] mx-auto bg-gradient-to-b from-[#4FB9B0] to-[#87CEEB] relative overflow-hidden flex flex-col justify-center items-center"
      style={{ height: "calc(100dvh - var(--nav-reserve, 0px))" }}
    >
      {/* Animated Star Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="text-yellow-400 animate-spin-slow"
          style={{
            animation: "spin 24s linear infinite",
          }}
        >
          <style jsx>{`
            @media (prefers-reduced-motion: reduce) {
              svg {
                animation: none !important;
              }
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin 24s linear infinite;
            }
          `}</style>
          <path
            d="M100 20 L110 70 L160 70 L125 100 L135 150 L100 125 L65 150 L75 100 L40 70 L90 70 Z"
            fill="currentColor"
            stroke="#F59E0B"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Mascot Image */}
        <div className="mb-8">
          <img
            src="/assets/reward/whiskers.png"
            alt="Wiskers the Wisk mascot"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </div>

        {/* Text Stack */}
        <div className="text-center mb-12">
          {/* Title */}
          <h1 className="text-teal-700 font-nunito text-2xl font-bold mb-2">
            Wiskers the Wisk
          </h1>
          
          {/* Headline */}
          <h2 className="text-black font-nunito text-3xl font-extrabold mb-4">
            Quest complete!
          </h2>
          
          {/* Subcopy */}
          <p className="text-black font-nunito text-lg leading-relaxed max-w-sm">
            Here's a friend to add to your crew.
          </p>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-8 left-6 right-6">
          <button
            onClick={handleContinue}
            className="w-full bg-[#F89921] hover:bg-[#E88A1A] active:bg-[#D67B19] 
                     text-black font-nunito text-lg font-bold py-4 px-6 rounded-2xl 
                     shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] 
                     hover:scale-105 active:scale-95 
                     transition-all duration-200"
          >
            Continue to next route
          </button>
        </div>
      </div>
    </div>
  );
}
