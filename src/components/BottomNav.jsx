import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavNode from "./BottomNavNode";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFloating, setIsFloating] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const barRef = useRef(null);
  const [barHeight, setBarHeight] = useState(64);

  // lift amount when the bar is docked (rectangular)
  const LIFT_DOCKED_PX = 8;

  // --- simple modal state ---
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Close modal on Esc
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // Measure the bar height
  useEffect(() => {
    if (!barRef.current) return;
    const el = barRef.current;

    const update = () => {
      const h = Math.ceil(el.getBoundingClientRect().height || 64);
      setBarHeight(h);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Always reserve space for the bar
  useEffect(() => {
    const reserve = `calc(${barHeight}px + env(safe-area-inset-bottom, 0px))`;
    document.documentElement.style.setProperty("--nav-reserve", reserve);
    document.documentElement.style.setProperty("--nav-height", `${barHeight}px`);
    return () => {
      document.documentElement.style.setProperty("--nav-reserve", "0px");
      document.documentElement.style.setProperty("--nav-height", "0px");
    };
  }, [barHeight]);

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

      setIsFloating(!nearBottom);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkScrollable);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollable]);

  // Reset float on route change
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
    <>
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
              ? "bg-amber-300 rounded-2xl shadow-lg py-4 px-6 border-2 border-orange-400"
              : "bg-amber-300 rounded-none shadow-none py-5 px-0 border-t-2 border-orange-400 border-b-0")
          }
          style={
            !isFloating
              ? {
                  // keep notch room AND add a little extra
                  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)",
                  // lift the whole bar slightly so icons sit higher
                  transform: `translateY(-${LIFT_DOCKED_PX}px)`,
                }
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
            onClick={openModal} // not implemented -> modal
            className="w-8 sm:w-10 aspect-square"
          />
          <BottomNavNode
            src="/assets/leaderboard.png"
            alt="Leaderboard"
            onClick={openModal} // not implemented -> modal
            className="aspect-[0.97] w-[26px] sm:w-[33px]"
          />
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)" }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl shadow-xl px-6 py-5 w-[280px] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-2 text-2xl leading-none text-black/60 hover:text-black"
            >
              &times;
            </button>
            <div className="text-[18px] font-extrabold mb-2">Still baking</div>
            <div className="text-[16px] mb-4 text-black/70">…almost done!</div>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-[#F89921] font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
