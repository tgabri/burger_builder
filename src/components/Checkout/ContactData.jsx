import React, { Component } from 'react';
import Button from '../Reusable/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../Reusable/Spinner';

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
          <form action=''>
            <input
              className={classes.Input}
              type='text'
              name='name'
              placeholder='Your name'
            />
            <input
              className={classes.Input}
              type='text'
              name='email'
              placeholder='Your email'
            />
            <input
              className={classes.Input}
              type='text'
              name='street'
              placeholder='Your Street'
            />
            <input
              className={classes.Input}
              type='text'
              name='sortCode'
              placeholder='Sort Code'
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
