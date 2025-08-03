import React, { useEffect, useState } from "react";

function isIos() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream
  );
}

function isInStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export default function AddToHomeScreenPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  useEffect(() => {
    // ANDROID: Listen for the event
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS: Show prompt only if iOS, Safari, and not already installed
    if (isIos() && !isInStandaloneMode()) {
      setShowIosPrompt(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // ANDROID: The native PWA prompt
  if (showPrompt) {
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
        <span style={{fontWeight:600, fontSize:"1.12rem", color:"#c47000"}}>Add Spatch to your home screen?</span>
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

  // iOS: Show custom guide
  if (showIosPrompt) {
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
        flexDirection: "column",
        alignItems: "center",
        padding: "15px 0"
      }}>
        <span style={{fontWeight:600, fontSize:"1.10rem", color:"#c47000", marginBottom: 5}}>
          Add PantryPal to your home screen:
        </span>
        <span style={{fontSize: "1.04rem", color: "#444", fontWeight: 500}}>
          Tap <span style={{display:"inline-block",verticalAlign:"middle"}}>
            <img src="/assets/share.png" alt="Share" className="inline w-5 h-5 mx-1 align-middle" />
          </span> then “Add to Home Screen”
        </span>
        <button
          onClick={() => setShowIosPrompt(false)}
          style={{
            marginTop: 10,
            fontWeight: 600,
            color: "#c47000",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.02rem",
          }}
        >
          Close
        </button>
      </div>
    );
  }

  // Default: no prompt
  return null;
}
