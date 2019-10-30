import React from 'react';
import classes from './Order.css';

export default function Order(props) {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredients.map(ingredient => (
          <span
            style={{
              textDecoration: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
            }}
            key={ingredient.name}
          >
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>£{props.price}</strong>
      </p>
    </div>
  );
}
