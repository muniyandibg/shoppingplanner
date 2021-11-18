import "./App.css";
import Budget from "./components/Budget/Budget";
import PurchaseList from "./components/PurchaseList/PurchaseList";

function App() {
  return (
    <div className="AppContainer">
      <h2>Shopping Planner [ Redux + Hooks ]</h2>
      <Budget />
      <PurchaseList />
    </div>
  );
}

export default App;
