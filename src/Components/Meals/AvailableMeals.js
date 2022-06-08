import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

function AvailableMeals() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMeals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://clonep1-b56bc-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      console.log(response.status);

      const data = await response.json();
      const MealsData = [];

      for (const key in data) {
        MealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setData(MealsData);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(err.message || "Something went wrong!");
      return;
    }
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      {isLoading && (
        <section className={classes.MealsLoading}>
          <h1>Loading...</h1>
        </section>
      )}
      {error && (
        <section className={classes.MealsError}>
          <h1>{error}</h1>
        </section>
      )}
      {!isLoading && !error && (
        <div className={classes.meals}>
          <Card>
            {data.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
          </Card>
        </div>
      )}
    </>
  );
}

export default AvailableMeals;
