import React, { useEffect, useState } from "react";

export default function AddToHomeScreenPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!showPrompt || !isMobile) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 80,
      left: 0,
      right: 0,
      margin: "auto",
      width: "95vw",
      maxWidth: 480,
      background: "#fffbea",
      border: "1.5px solid #FFD700",
      borderRadius: 16,
      boxShadow: "0 4px 16px #0002",
      zIndex: 10000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "14px 0"
    }}>
      <span style={{fontWeight:600, fontSize:"1.12rem", color:"#c47000"}}>Add PantryPal to your home screen?</span>
      <button
        style={{
          background: "#FFD700",
          color: "#222",
          border: "none",
          borderRadius: 8,
          marginLeft: 16,
          fontWeight: 700,
          fontSize: "1rem",
          padding: "7px 20px",
          cursor: "pointer",
        }}
        onClick={async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") setShowPrompt(false);
          }
        }}
      >
        Add
      </button>
      <button
        style={{
          marginLeft: 8,
          fontWeight: 600,
          color: "#c47000",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.02rem",
        }}
        onClick={() => setShowPrompt(false)}
      >Later</button>
    </div>
  );
}
