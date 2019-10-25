import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Reusable/Logo';
import NavigationItems from './NavigationItems';

export default function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
}
