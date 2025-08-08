import React from "react";
import { useNavigate } from "react-router-dom";

export default function RewardScreen() {
  const navigate = useNavigate();
  const handleContinue = () => navigate("/breakfast");

  // Tweak these to size/position the spinning star
  const STAR_SIZE = 600; // px
  const STAR_TOP  = 120; // px from the top

  return (
    <div
      className="max-w-[480px] mx-auto bg-gradient-to-b from-[#4FB9B0] to-[#87CEEB] relative overflow-hidden flex flex-col justify-center items-center"
      style={{ height: "calc(100dvh - var(--nav-reserve, 0px))" }}
    >
      <style>{`
        @keyframes reward-spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
        @keyframes reward-bob  { 0%,100% { transform: translateX(-50%) translateY(-6px);} 50% { transform: translateX(-50%) translateY(6px);} }
        @media (prefers-reduced-motion: reduce) {
          .reward-spin { animation: none !important; }
          .reward-bob  { animation: none !important; }
        }
      `}</style>

      {/* Spinning star behind Whiskers */}
      <div
        className="pointer-events-none absolute left-1/2 z-0 reward-bob"
        style={{
          top: STAR_TOP,
          width: STAR_SIZE,
          height: STAR_SIZE,
          transform: "translateX(-50%)",
          animation: "reward-bob 6s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          className="text-yellow-400 reward-spin"
          style={{ animation: "reward-spin 24s linear infinite" }}
        >
          <path
            d="M100 20 L110 70 L160 70 L125 100 L135 150 L100 125 L65 150 L75 100 L40 70 L90 70 Z"
            fill="currentColor"
            stroke="#F59E0B"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* ↓ tightened gap: mb-8 -> mb-2 */}
        <div className="mb-2">
          <img
            src="/assets/reward/whiskers.png"
            alt="Wiskers the Wisk mascot"
            className="w-[600px] h-[600px] object-contain drop-shadow-lg"
          />
        </div>

        {/* ↓ optionally tighten headline stack a bit */}
        <div className="text-center mb-10">
          <h1 className="text-teal-700 font-nunito text-2xl font-bold mb-1">
            Wiskers the Wisk
          </h1>
          <h2 className="text-black font-nunito text-3xl font-extrabold mb-3">
            Quest complete!
          </h2>
          <p className="text-black font-nunito text-lg leading-relaxed max-w-sm">
            Here's a friend to add to your crew.
          </p>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <button
            onClick={handleContinue}
            className="w-full bg-[#F89921] hover:bg-[#E88A1A] active:bg-[#D67B19]
                       text-black font-nunito text-lg font-bold py-4 px-6 rounded-2xl
                       shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95
                       transition-all duration-200"
          >
            Continue to next route
          </button>
        </div>
      </div>
    </div>
  );
}
