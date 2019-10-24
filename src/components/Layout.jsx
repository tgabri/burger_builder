import React from 'react';
import classes from './Layout.css';
import Toolbar from './Navigation/Toolbar';

export default function Layout(props) {
  return (
    <React.Fragment>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
}
