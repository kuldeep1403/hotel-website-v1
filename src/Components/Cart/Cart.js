import React, { useContext, useState } from "react";
import CartContext from "../../context/Cartcontext";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

function Cart({ onHideCart }) {
  const contextData = useContext(CartContext);

  const totalAmount = "$" + contextData.totalAmount.toFixed(2);

  const hasItems = contextData.items.length > 0;

  const addCartHandler = (item) => {
    contextData.addItems({ ...item, amount: 1 });
  };
  const removeCartHandler = (id) => {
    contextData.removeItems(id);
  };

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSumit] = useState(false);

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://clonep1-b56bc-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: contextData.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSumit(true);
    contextData.clearItems();
  };

  return (
    <>
      <Modal onHideCart={onHideCart}>
        {!isSubmitting && !didSubmit && (
          <>
            {
              <ul className={classes["cart-items"]}>
                {contextData.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        onAdd={addCartHandler.bind(null, item)}
                        onRemove={removeCartHandler.bind(null, item.id)}
                      />
                    </li>
                  );
                })}
              </ul>
            }
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {isCheckOut && (
              <CheckOut onConfirm={submitOrderHandler} onCancel={onHideCart} />
            )}
            {!isCheckOut && (
              <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={onHideCart}>
                  Close
                </button>
                {hasItems && (
                  <button className={classes.button} onClick={orderHandler}>
                    Order
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {isSubmitting && <p>Sending order data...</p>}
        {!isSubmitting && didSubmit && (
          <>
            <p>Successfully sent the order!!</p>
            <div className={classes.actions}>
              <button className={classes.button} onClick={onHideCart}>
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default Cart;
