import React, { useContext } from "react";
import CartContext from "../../context/Cartcontext";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ name, price, description, id }) {
  const newPrice = "$" + price.toFixed(2);
  const contextData = useContext(CartContext);
  console.log(contextData.items);
  const handleAddToCart = (amount) => {
    contextData.addItems({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };
  return (
    <>
      <div className={classes.meal}>
        <div>
          <h3>{name}</h3>
          <div className={classes.description}>{description}</div>
          <div className={classes.price}>{newPrice}</div>
        </div>
        <div>
          <MealItemForm onAddToCart={handleAddToCart} />
        </div>
      </div>
    </>
  );
}

export default MealItem;
