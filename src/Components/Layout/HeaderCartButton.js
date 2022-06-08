import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/Cartcontext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton({ onShowCart }) {
  const contextData = useContext(CartContext);

  const numberOfCartItems = contextData.items.reduce((currNumber, items) => {
    return currNumber + items.amount;
  }, 0);

  const [buttonAnimation, setButtonAnimation] = useState(false);

  const { items } = contextData;

  const btnClasses = `${classes.button} ${buttonAnimation ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonAnimation(true);

    const timer = setTimeout(() => {
      setButtonAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btnClasses} onClick={onShowCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}> {numberOfCartItems}</span>
      </button>
    </>
  );
}

export default HeaderCartButton;
