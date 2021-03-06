import React from 'react';
import classes from './BuildControl.css';

export default function BuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeIngHandler}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngHandler}>
        More
      </button>
    </div>
  );
}
