import React, { Component } from 'react';
import Burger from './Burger';

export default class BurgerBuilder extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div>
          <Burger />
        </div>
        <div>Build Controlls</div>
      </React.Fragment>
    );
  }
}
