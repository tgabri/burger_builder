import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Layout from './components/Reusable/Layout';
import Checkout from './components/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
