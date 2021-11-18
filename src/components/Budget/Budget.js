import "./Budget.css";
import { useDispatch, useSelector } from "react-redux";
import { changeBudgetAction } from "../../actions/budgetActions";
import { useState } from "react";

function Budget() {
  const appState = useSelector((state) => state);
  console.log(appState);
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.budget);
  const [editBudget, setEditBudget] = useState(false);
  const [amount, setAmount] = useState("");

  const handleBudgetChange = () => {
    dispatch(changeBudgetAction(amount));
    setAmount("");
    setEditBudget(false);
  };
  return (
    <div className="BudgetContainer">
      <h1 className="BudgetTitle">MY BUDGET</h1>
      {editBudget ? (
        <div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter New Budget"
          />
          <button onClick={() => handleBudgetChange()}>SAVE</button>
          <button onClick={() => setEditBudget(false)}>CANCEL</button>
        </div>
      ) : (
        <div>
          <span className="BudgetAmount">{budget}</span>
          <button onClick={() => setEditBudget(true)}>CHANGE</button>
        </div>
      )}
    </div>
  );
}
export default Budget;
