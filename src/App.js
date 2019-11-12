import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Layout from './components/Reusable/Layout';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/auth' component={Auth} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
