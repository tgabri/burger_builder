import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Layout from './components/Reusable/Layout';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
