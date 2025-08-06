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
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{recipe.nickname || recipe.real_name}</h2>
      {/* --- Image --- */}
      {recipe.imgUrl && (
        <img
          src={`/static/${recipe.imgUrl}`}
          alt={recipe.nickname || "Recipe image"}
          className="w-full max-w-xs mx-auto rounded mb-4"
        />
      )}
      {/* --- Other Recipe Details --- */}
      <div className="mb-2">Time: {recipe.time} mins</div>
      <div className="mb-2">Servings: {recipe.servings}</div>
      <div className="mb-2">Difficulty: {recipe.difficulty}</div>
      <div className="mb-4">
        <strong>Ingredients:</strong>
        <ul className="list-disc pl-5">
          {(recipe.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Kitchenware:</strong>
        <ul className="list-disc pl-5">
          {(recipe.kitchenware || []).map((kw, i) => <li key={i}>{kw}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Steps:</strong>
        <ol className="list-decimal pl-5">
          {(recipe.steps || []).map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>
    </div>
  );
}
