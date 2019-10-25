import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

export default function Burger(props) {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])].map((_, index) => (
        <BurgerIngredient key={ingredient + index} type={ingredient} />
      ));
    })
    .reduce((arr, current) => {
      return arr.concat(current);
    }, []);
  if (!transformedIngredients.length)
    transformedIngredients = <p>Please start adding some ingredients!</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}
