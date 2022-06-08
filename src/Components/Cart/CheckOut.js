import React, { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
var mob = /^[1-9]{1}[0-9]{9}$/;
const validMobile = (value) => mob.test(value);

function CheckOut({ onCancel, onConfirm }) {
  const enteredName = useRef();
  const enteredAddress = useRef();
  const enteredMobile = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    mobile: true,
  });

  const confirmHandler = (e) => {
    e.preventDefault();

    const name = enteredName.current.value;
    const address = enteredAddress.current.value;
    const mobile = enteredMobile.current.value;

    const nameIsValid = !isEmpty(name);
    const addressIsValid = !isEmpty(address);
    const mobileIsValid = validMobile(mobile);

    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      mobile: mobileIsValid,
    });

    const formIsValid = nameIsValid && addressIsValid && mobileIsValid;

    if (!formIsValid) {
      return;
    }

    console.log(name);
    console.log(address);
    console.log(mobile);

    onConfirm({
      name,
      address,
      mobile,
    });
  };

  return (
    <>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            formInputValidity.name ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={enteredName} />
          {!formInputValidity.name && <p>Please Enter A Valid Name</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.address ? "" : classes.invalid
          }`}
        >
          <label htmlFor="address">Address</label>
          <input type="text" id="address" ref={enteredAddress} />
          {!formInputValidity.address && <p>Please Enter A Valid Address</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.mobile ? "" : classes.invalid
          }`}
        >
          <label htmlFor="mobile">Mobile Number</label>
          <input type="number" id="mobile" ref={enteredMobile} />
          {!formInputValidity.name && <p>Please Enter A Valid Mobile Number</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  );
}

export default CheckOut;
