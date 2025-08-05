import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetail({ isAdmin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(() => navigate("/")); // go home on error
  }, [id, navigate]);

  if (!recipe) return <div>Loading...</div>;

  // Replace this with your "unlocked" logic
  const isUnlocked = true; // or check user progress

  if (!isUnlocked && !isAdmin) {
    return <div>This recipe is locked!</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      {/* Show ingredients, steps, image, etc. */}
    </div>
  );
}
