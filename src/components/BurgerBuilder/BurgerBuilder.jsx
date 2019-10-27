import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.6,
  meat: 1.5
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 1.5,
    purchaseable: false,
    purchasing: false
  };

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
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Gabor',
        address: {
          street: 'Teststreet 1',
          sortCode: 'sk102da',
          country: 'UK'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'As Soon As'
    };
    axios
      .post('/orders.json', order)
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error));
  };

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={totalPrice}
          />
        </Modal>
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
    );
  }
}
