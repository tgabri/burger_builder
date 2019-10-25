import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  );
}
