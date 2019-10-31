import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

export default function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
  );
}