import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

export default function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>£{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ingredient => (
        <BuildControl
          key={ingredient.label}
          label={ingredient.label}
          addIngHandler={() => props.addIngHandler(ingredient.type)}
          removeIngHandler={() => props.removeIngHandler(ingredient.type)}
          disabled={props.disabled[ingredient.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
}
