// import MealWorld from "./components/MealWorld";

// function App() {
//   return (
//     <div className="App">
//       {/* Example for breakfast. In a real app, use a router to select meal */}
//       <MealWorld meal="breakfast" />
//     </div>
//   );
// }

import AddToHomeScreenPrompt from "./components/AddToHomeScreenPrompt";
import BreakfastRoute from "./components/BreakfastRoute";

function App() {
  return (
    <>
      <AddToHomeScreenPrompt />
      <BreakfastRoute />
    </>
  );
}

export default App;
