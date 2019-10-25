import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

export default class Layout extends Component {
  state = {
    isShown: false
  };

  sideDrawerHandler = () => {
    this.setState({
      isShown: false
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        isShown: !prevState.isShown
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar drawerToggle={this.sideDrawerToggleHandler} />
        <SideDrawer close={this.sideDrawerHandler} open={this.state.isShown} />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
