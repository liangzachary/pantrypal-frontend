import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function BreakfastRoute({ isAdmin, setIsAdmin }) {
  const [atBottom, setAtBottom] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState("");

  // ...your unlocked logic, etc.

  // Admin login modal logic
  function handleAdminLogin() {
    setAdminError("");
    if (adminInput === "spatchSecret123") { // Change to your real secret!
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminInput("");
    } else {
      setAdminError("Incorrect password.");
    }
  }

  // ... your other hooks, tooltip logic, and food images here

  return (
    <div className="mx-auto w-full bg-stone-200 max-w-[480px] min-h-screen flex flex-col relative">
      {/* ... header and main content ... */}

      {/* Orange admin login button, centered at bottom */}
      {!isAdmin && (
        <button
          className="fixed left-1/2 top-1/2 -translate-y-1/2 z-50 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white shadow-lg border-2 border-orange-700 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold transition"
          style={{ boxShadow: "0 4px 16px #f5822077" }}
          onClick={() => setShowAdminModal(true)}
          title="Admin Login"
        >
          <span role="img" aria-label="lock">🔒</span>
        </button>
      )}
      {/* If admin, show a badge instead */}
      {isAdmin && (
        <div className="fixed left-1/2 bottom-16 z-50 -translate-x-1/2 bg-lime-400 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold border-2 border-lime-700 shadow-lg">
          <span role="img" aria-label="admin">🛠️</span>
        </div>
      )}

      {/* Admin login modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-3 shadow-xl min-w-[260px]">
            <h2 className="font-bold text-xl">Admin Login</h2>
            <input
              type="password"
              value={adminInput}
              onChange={e => setAdminInput(e.target.value)}
              className="border px-3 py-2 rounded"
              placeholder="Admin password"
              autoFocus
            />
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
              onClick={handleAdminLogin}
            >
              Log In
            </button>
            <button
              className="text-gray-500 text-sm underline"
              onClick={() => setShowAdminModal(false)}
            >
              Cancel
            </button>
            {adminError && <div className="text-red-600 text-sm">{adminError}</div>}
          </div>
        </div>
      )}

      {/* ...rest of your route map, images, tooltip, and nav... */}
    </div>
  );
}
