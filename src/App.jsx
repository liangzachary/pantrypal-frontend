import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import BreakfastRoute from "./components/BreakfastRoute";
import AddRecipe from "./components/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <Router>
      <button
        className="fixed top-3 right-3 bg-teal-700 text-white px-2 py-1 rounded z-50"
        onClick={() => setAdmin(a => !a)}
      >
        {admin ? "User View" : "Admin"}
      </button>

      <Routes>
        {admin ? (
          <Route path="*" element={<AddRecipe isAdmin={admin} />} />
        ) : (
          [
            <Route key="home" path="/" element={<HomeScreen />} />,
            <Route key="breakfast" path="/breakfast" element={<BreakfastRoute isAdmin={admin} setIsAdmin={setAdmin} />} />,
            <Route key="recipe" path="/recipe/:id" element={<RecipeDetail />} />,
          ]
        )}
      </Routes>
    </Router>
  );
}
