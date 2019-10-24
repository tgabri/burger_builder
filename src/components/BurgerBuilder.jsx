import React, { Component } from 'react';
import Burger from './Burger';
import BuildControls from './BuildControls';

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  render() {
    const { ingredients } = this.state;
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />

        <BuildControls />
      </React.Fragment>
    );
  }
}
