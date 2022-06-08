import React, { useState } from "react";
import classes from "./Input.module.css";

function Input({ label, type, input, onHandleInputChange }) {
  const [enteredAmount, setEnteredAmount] = useState("");

  const handleAmount = (e) => {
    setEnteredAmount(e.target.value);
    onHandleInputChange(enteredAmount);
  };

  return (
    <>
      <div className={classes.input}>
        <label htmlFor={input.id}>{label}</label>
        <input {...input} onChange={handleAmount} />
      </div>
    </>
  );
}

export default Input;
