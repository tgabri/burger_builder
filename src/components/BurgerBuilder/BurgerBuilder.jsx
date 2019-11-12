import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
} from '../../store/actions/index';
import axios from '../../axios-orders';

import Burger from '../Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../Reusable/Spinner';
import ErrorHandler from '../Reusable/ErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    console.log(this.props, 'COMPDIDMOUNT');
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing } = this.state;
    const {
      totalPrice,
      ingredients,
      onAddIngredient,
      onRemoveIngredient,
      error,
      isAuthenticated
    } = this.props;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    if (error) {
      return (
        <p style={{ textAlign: 'center' }}>Ingredients cannot be loaded!</p>
      );
    }
    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {!ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              price={totalPrice}
            />
          )}
        </Modal>
        {!ingredients ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
              addIngHandler={onAddIngredient}
              removeIngHandler={onRemoveIngredient}
              disabled={disabledInfo}
              price={totalPrice}
              isAuthenticated={isAuthenticated}
              purchaseable={this.updatePurchaseState(ingredients)}
              ordered={this.purchaseHandler}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientName => dispatch(addIngredient(ingredientName)),
    onRemoveIngredient: ingredientName =>
      dispatch(removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
