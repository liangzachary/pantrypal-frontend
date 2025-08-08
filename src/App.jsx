import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import BreakfastRoute from "./components/BreakfastRoute";
import AddRecipe from "./components/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <Router>
      {/* Admin toggle button */}
      <button
        className="fixed top-3 right-3 bg-teal-700 text-white px-2 py-1 rounded z-50"
        onClick={() => setAdmin((a) => !a)}
      >
        {admin ? "User View" : "Admin"}
      </button>

      {/* Page content with padding so BottomNav never overlaps */}
      <div className="pb-20">
        <Routes>
          {admin ? (
            <Route path="*" element={<AddRecipe isAdmin={admin} />} />
          ) : (
            <>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/breakfast"
                element={<BreakfastRoute isAdmin={admin} />}
              />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </>
          )}
        </Routes>
      </div>

      {/* Always visible bottom nav in user mode */}
      {!admin && <BottomNav />}
    </Router>
  );
}
