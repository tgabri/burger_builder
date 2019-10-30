import React, { Component } from 'react';
import Order from './Order';
import axios from '../../axios-orders';
import ErrorHandler from '../Reusable/ErrorHandler';
import Spinner from '../Reusable/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(({ data }) => {
        const orders = [];
        for (let key in data) {
          orders.push({ ...data[key], id: key });
        }
        this.setState({ isLoading: false, orders });
      })
      .catch(err => this.setState({ isLoading: false }));
  }

  render() {
    const { orders, isLoading } = this.state;
    if (isLoading) return <Spinner />;
    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}
export default ErrorHandler(Orders, axios);
