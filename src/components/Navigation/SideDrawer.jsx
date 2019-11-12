import React from 'react';
import Logo from '../Reusable/Logo';
import NavigationItems from './NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
