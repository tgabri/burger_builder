import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from './CheckoutSummary';
import ContactData from './ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price += +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              price={this.state.price}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
