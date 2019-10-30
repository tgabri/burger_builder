import React from 'react';
import classes from './Order.css';

export default function Order() {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>£2.89</strong>
      </p>
    </div>
  );
}
