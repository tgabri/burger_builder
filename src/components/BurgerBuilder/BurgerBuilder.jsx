import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';
import ErrorHandler from '../Reusable/ErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.6,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1.5,
    purchaseable: false,
    purchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('https://burgerbuilder-31ab8.firebaseio.com/ingredients.json')
      .then(({ data }) =>
        this.setState({
          ingredients: data
        })
      )
      .catch(error => this.setState({ error: true }));
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    this.setState({
      purchaseable: sum > 0
    });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const itemPrice = INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: this.state.totalPrice + itemPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const itemPrice = INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: this.state.totalPrice - itemPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue');
    //
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`);

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchaseable,
      purchasing,
      isLoading,
      error
    } = this.state;
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
          {isLoading || !ingredients ? (
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
              addIngHandler={this.addIngredientHandler}
              removeIngHandler={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={totalPrice}
              purchaseable={purchaseable}
              ordered={this.purchaseHandler}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
