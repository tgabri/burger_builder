import React, { Component } from 'react';
import Button from '../Reusable/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';
import Input from '../Input/Input';

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'delivery', displayValue: 'Delivery' },
            { value: 'collection', displayValue: 'Collection' }
          ]
        },
        value: ''
      }
    },
    isLoading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    axios
      .post('/orders.json', order)
      .then(({ data }) => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ isLoading: false }));
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const { value } = e.target;
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const { isLoading, orderForm } = this.state;

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
                changed={e => this.inputChangeHandler(e, formElement.id)}
              />
            ))}
            <Button btnType='Success'>ORDER</Button>
          </form>
        )}
      </div>
    );
  }
}
