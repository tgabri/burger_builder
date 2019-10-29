import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../Reusable/Button';
import classes from './CheckoutSummary.css';

export default function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it is tasty!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
}
