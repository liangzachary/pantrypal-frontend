import RecipeDetail from './RecipeDetail';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockRecipe = {
  imgUrl: "https://your-image-url.com/sample.jpg",
  nickname: "Crimson Sunset",
  real_name: "Chilli oil fried egg",
  time: 10,
  servings: 1,
  difficulty: 1,
  ingredients: ["1 large egg", "1 ts Chilli oil", "1 ts salt"],
  kitchenware: ["Non-stick pan", "Spatula"],
  steps: [
    "Put non-stick pan over medium heat.",
    "Once hot, put the chilli oil onto the pan and spread evenly.",
    "Crack egg into the middle of the pan and sprinkle with salt.",
    "Fry just until yolk is set. Place the egg onto a plate with the residue of chilli oil.",
  ],
};

export default {
  title: 'RecipeDetail',
  component: RecipeDetail,
  // Add decorators to wrap in a Router context
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/recipes/1']}>
        <Routes>
          <Route path="/recipes/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ]
};

export const Default = () => {
  // Mock the fetch to return mockRecipe for Storybook ONLY
  window.fetch = async () => ({
    ok: true,
    json: async () => mockRecipe
  });
  return <RecipeDetail />;
};
