import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from './CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, purchased } = this.props;

    return (
      <div>
        {purchased && <Redirect to='/' />},
        {ingredients ? (
          <React.Fragment>
            <CheckoutSummary
              ingredients={ingredients}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinued}
            />
            <Route
              path={`${this.props.match.path}/contact-data`}
              component={ContactData}
            />
          </React.Fragment>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
