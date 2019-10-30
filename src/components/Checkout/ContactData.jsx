import React, { Component } from 'react';
import Button from '../Reusable/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';
import Input from '../Input/Input';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      sortCode: ''
    },
    isLoading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: 'Gabor',
        address: {
          street: 'Teststreet 1',
          sortCode: 'sk102da',
          country: 'UK'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'Fastest'
    };
    axios
      .post('/orders.json', order)
      .then(({ data }) => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details!</h4>
        {isLoading ? (
          <Spinner />
        ) : (
          <form>
            <Input
              inputType='input'
              type='text'
              name='name'
              placeholder='Your name'
            />
            <Input
              inputType='input'
              type='email'
              name='email'
              placeholder='Your email'
            />
            <Input
              inputType='input'
              type='text'
              name='street'
              placeholder='Your Street'
            />
            <Input
              inputType='input'
              type='text'
              name='postCode'
              placeholder='Post Code'
            />
            <Button btnType='Success' clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}
