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
      {controls.map(ingredient => (
        <BuildControl
          key={ingredient.label}
          label={ingredient.label}
          addIngHandler={() => props.addIngHandler(ingredient.type)}
          removeIngHandler={() => props.removeIngHandler(ingredient.type)}
        />
      ))}
    </div>
  );
}
