import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Reusable/Logo';
import NavigationItems from './NavigationItems';
import DrawerToggle from './DrawerToggle';

export default function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggle} />
      <div className={classes.Logo}>
        <Logo height='80%' />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}
