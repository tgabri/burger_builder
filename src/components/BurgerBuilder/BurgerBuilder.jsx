import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Burger from '../Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';
import ErrorHandler from '../Reusable/ErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get('https://burgerbuilder-31ab8.firebaseio.com/ingredients.json')
    //   .then(({ data }) =>
    //     this.setState({
    //       ingredients: data
    //     })
    //   )
    //   .catch(error => this.setState({ error: true }));
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue');

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
    const { purchaseable, purchasing, isLoading, error } = this.state;
    const {
      totalPrice,
      ingredients,
      addIngredient,
      removeIngredient
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
              addIngHandler={addIngredient}
              removeIngHandler={removeIngredient}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    removeIngredient: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
