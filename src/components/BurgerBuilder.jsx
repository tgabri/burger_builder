import React, { Component } from 'react';
import Burger from './Burger';
import BuildControls from './BuildControls';

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
    totalPrice: 1.5
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
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />

        <BuildControls
          addIngHandler={this.addIngredientHandler}
          removeIngHandler={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
        />
      </React.Fragment>
    );
  }
}
