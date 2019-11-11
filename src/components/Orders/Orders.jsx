import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../store/actions/index';
import Order from './Order';
import axios from '../../axios-orders';
import ErrorHandler from '../Reusable/ErrorHandler';
import Spinner from '../Reusable/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const { orders, isLoading, onDeleteOrder } = this.props;

    if (isLoading) return <Spinner />;
    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            deleteHandler={() => onDeleteOrder(order.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    isLoading: state.orderReducer.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onDeleteOrder: id => dispatch(deleteOrder(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, axios));
