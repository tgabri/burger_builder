import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Layout from './components/Reusable/Layout';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
require('dotenv').config();

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <React.Fragment>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </React.Fragment>
    );
    if (isAuthenticated) {
      routes = (
        <React.Fragment>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
