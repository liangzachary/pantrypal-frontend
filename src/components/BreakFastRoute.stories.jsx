// BreakfastRoute.stories.jsx

import React from "react";
import BreakfastRoute from "./BreakfastRoute";

// Example mock recipes data (simulate backend, must match your model)
const mockRecipes = [
  {
    id: 2,
    imgUrl: "https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv",
    nickname: "Crimson Sunset",
    real_name: "Chili Oil Fried Eggs",
    time: 10,
    servings: 1,
    difficulty: 1,
    ingredients: ["1 Large Egg", "Chili Oil (1 tbsp)"],
    kitchenware: ["Nonstick pan", "Spatula"],
    steps: [
      "Put nonstick pan over medium heat",
      "Once hot, put chili oil onto the pan and spread evenly",
      "Crack egg into the middle of the pan and sprinkle with salt",
      "Fry just until yolk is set",
      "Place egg onto a plate with the residue chili oil",
    ],
  },
  // ...add more recipes if you want to test more food nodes!
];

// Mocked version of BreakfastRoute
const MockedBreakfastRoute = (props) => {
  // Override fetch and use static recipes in place of API
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(() => {
    setRecipes(mockRecipes);
  }, []);
  // Inject recipes as a prop (if you refactored to accept recipes prop)
  // Otherwise, mock fetch in component with if (window.IS_STORYBOOK) setRecipes(mockRecipes)
  // If you don't want to refactor, you can monkeypatch fetch in global scope, but that's messier.

  // Use isAdmin to show all unlocked, or leave as false
  return <BreakfastRoute {...props} isAdmin={true} />;
};

export default {
  title: "Routes/BreakfastRoute",
  component: MockedBreakfastRoute,
};

export const Default = () => <MockedBreakfastRoute />;
