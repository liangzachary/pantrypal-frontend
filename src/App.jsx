import React, { useState } from "react";
import BreakfastRoute from "./components/BreakfastRoute";
import AdminPage from "./components/AdminPage";
import AddRecipe from "./components/AddRecipe";
// ...
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreakfastRoute from "./components/BreakfastRoute";
import RecipeDetail from "./components/RecipeDetail";
import RecipeAdmin from "./components/RecipeAdmin"; // New!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BreakfastRoute />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/admin" element={<RecipeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function App() {
  return (
    <div>
      <AddRecipe />
      {/* ...your other UI */}
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div>
      <button
        className="fixed top-3 right-3 bg-teal-700 text-white px-2 py-1 rounded"
        onClick={() => setAdmin(a => !a)}
      >
        {admin ? "User View" : "Admin"}
      </button>
      {admin ? <AdminPage /> : <BreakfastRoute />}
    </div>
  );
}
