import React, { useState } from "react";
import BreakfastRoute from "./components/BreakfastRoute";
import AddRecipe from "./components/AddRecipe";

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div>
      <button
        className="fixed top-3 right-3 bg-teal-700 text-white px-2 py-1 rounded z-50"
        onClick={() => setAdmin(a => !a)}
      >
        {admin ? "User View" : "Admin"}
      </button>

      {admin ? (
        <AddRecipe isAdmin={admin} />
      ) : (
        <div>
          <BreakfastRoute isAdmin={admin} setIsAdmin={setAdmin} />
        </div>
      )}
    </div>
  );
}
