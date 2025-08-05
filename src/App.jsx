import React, { useState } from "react";
import BreakfastRoute from "./components/BreakfastRoute";
import AdminPage from "./components/AdminPage";
import AddRecipe from "./components/AddRecipe";

// You can add more imports as needed

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div>
      {/* Admin toggle button */}
      <button
        className="fixed top-3 right-3 bg-teal-700 text-white px-2 py-1 rounded z-50"
        onClick={() => setAdmin(a => !a)}
      >
        {admin ? "User View" : "Admin"}
      </button>

      {/* Show admin or user UI */}
      {admin ? (
        // Everything inside here only shows in admin mode
        <div>
          <AdminPage isAdmin={admin} setIsAdmin={setAdmin} />
          {/* You can add more admin-only features here, like: */}
          <AddRecipe isAdmin={admin} />
        </div>
      ) : (
        // User (non-admin) view
        <div>
          <BreakfastRoute isAdmin={admin} setIsAdmin={setAdmin} />
          {/* ...add other normal user UI/components here as needed */}
        </div>
      )}
    </div>
  );
}
