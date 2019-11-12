import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

class Layout extends Component {
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
    const { isAuthenticated } = this.props;
    return (
      <React.Fragment>
        <Toolbar
          isAuthenticated={isAuthenticated}
          drawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={isAuthenticated}
          close={this.sideDrawerHandler}
          open={this.state.isShown}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
