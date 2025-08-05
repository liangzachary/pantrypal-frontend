import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreakfastRoute from "./components/BreakfastRoute";
import RecipeDetail from "./components/RecipeDetail";
import AdminPage from "./components/AdminPage";
import AddRecipe from "./components/AddRecipe";
// import RecipeAdmin from "./components/RecipeAdmin"; // remove if unused

export default function App() {
  // GLOBAL admin state for the app!
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BreakfastRoute isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
        <Route path="/recipe/:id" element={<RecipeDetail isAdmin={isAdmin} />} />
        <Route path="/admin" element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
        {/* You can pass isAdmin to AddRecipe if you use it as a route */}
        {/* <Route path="/add-recipe" element={<AddRecipe isAdmin={isAdmin} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
