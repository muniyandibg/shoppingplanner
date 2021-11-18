import "./PurchaseList.css";
import { addItemAction, removeItemAction } from "../../actions/purchaseActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function PurchaseList() {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.budget);
  const purchaseList = useSelector((state) => state.purchase.purchaseList);
  const [addNewItem, setAddNewItem] = useState(false);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);

  const handleAddNewItem = (e) => {
    e.preventDefault();
    let totalPurchase = purchaseList
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    if (totalPurchase + parseInt(amount) > budget) {
      alert("Exceeding budget limit. This item cannot be added.");
      return;
    }
    dispatch(addItemAction({ item: item, amount: parseInt(amount) }));
    console.log("list", purchaseList);
    setTotal(totalPurchase + parseInt(amount));
    setAmount("");
    setItem("");
    setAddNewItem(false);
  };
  const handleRemoveItem = (i, amount) => {
    setTotal(total - parseInt(amount));
    dispatch(removeItemAction(i));
  };
  return (
    <div className="PurchaseListContainer">
      <div className="PurchaseListHeader">
        <h3 className="PurchaseListHeaderTitle">My Purchase List</h3>
        <button onClick={() => setAddNewItem(true)}>ADD ITEM</button>
      </div>
      {addNewItem && (
        <form onSubmit={(e) => handleAddNewItem(e)} className="addNewItem">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Item Name"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          {/* <button onClick={handleAddNewItem}>ADD</button> */}
          <button type="submit">ADD</button>
          <button onClick={() => setAddNewItem(false)}>CANCEL</button>
        </form>
      )}
      {purchaseList.length > 0 &&
        purchaseList.map((item, index) => {
          return (
            <div key={index} className="PurchaseItemContainer">
              <div>
                <span className="ItemNumber">{index + 1}</span>
                <span>{item.item}</span>
              </div>
              <div>
                <span className="ItemAmount">{item.amount}</span>
                <button onClick={() => handleRemoveItem(index, item.amount)}>
                  X
                </button>
              </div>
            </div>
          );
        })}

      <div className="PurchaseListFooter">
        <h3>Total Items: {purchaseList.length}</h3>
        <h3>Value: {total}</h3>
        <h3>Balance: {budget - total}</h3>
      </div>
    </div>
  );
}
export default PurchaseList;
