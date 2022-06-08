import React, { useState } from "react";
import ErrorModal from "../UI/Modal/ErrorModal";
import classes from "./MealItemForm.module.css";

function MealItemForm({ onAddToCart }) {
  const [enteredAmount, setEnteredAmount] = useState("");
  // const [amountIsValid, setAmountIsValid] = useState(true);
  const [error, setError] = useState();

  const handleAmountChange = (e) => {
    console.log(e.target.value);
    setEnteredAmount(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0) {
      // console.log(enteredAmountNumber);
      // setAmountIsValid(false);
      setError({
        title: "Invalid Input",
        message: "Please Enter Amount",
      });
      return;
    } else if (enteredAmountNumber < 1) {
      // console.log(enteredAmountNumber);
      // setAmountIsValid(false);
      setError({
        title: "Invalid Input",
        message: "Please Enter Correct Amount (>1)",
      });
      return;
    } else if (enteredAmountNumber > 50) {
      // console.log(enteredAmountNumber);
      // setAmountIsValid(false);
      setError({
        title: "Invalid Input",
        message: "Maximum Limit Reached",
      });
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  const onHandleError = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onHideError={onHandleError}
        />
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.input}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            step="1"
            value={enteredAmount}
            onChange={handleAmountChange}
          />
        </div>
        <button>+Add</button>
        {/* {!amountIsValid && <p>Please Enter A Valid Amount (1-20) .</p>} */}
      </form>
    </>
  );
}

export default MealItemForm;
