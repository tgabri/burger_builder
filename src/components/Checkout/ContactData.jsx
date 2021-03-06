import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../Reusable/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';
import Input from '../Input/Input';
import ErrorHandler from '../Reusable/ErrorHandler';
import { purchaseBurger } from '../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 7
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'delivery', displayValue: 'Delivery' },
            { value: 'collection', displayValue: 'Collection' }
          ]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    isFormValid: false
  };

  orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  checkIfValid(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (e, inputIdentifier) => {
    const { value } = e.target;
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = value;
    updatedFormElement.valid = this.checkIfValid(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid });
  };

  render() {
    const { orderForm, isFormValid } = this.state;
    const { isLoading } = this.props;

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details!</h4>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={e => this.inputChangeHandler(e, formElement.id)}
              />
            ))}
            <Button btnType='Success' disabled={!isFormValid}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    isLoading: state.orderReducer.isLoading,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) => dispatch(purchaseBurger(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ContactData, axios));
