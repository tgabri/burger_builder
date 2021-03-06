import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, order)
      .then(({ data }) => {
        dispatch(purchaseBurgerSuccess(data.name, order));
      })
      .catch(error => dispatch(purchaseBurgerFail(error)));
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get(`/orders.json?auth=${token}`)
      .then(({ data }) => {
        const orders = [];
        for (let key in data) {
          orders.push({ ...data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => dispatch(fetchOrdersFail()));
  };
};

export const deleteOrderAction = id => {
  return {
    type: actionTypes.DELETE_ORDER,
    id
  };
};

export const deleteOrder = id => {
  return dispatch => {
    axios
      .delete('/orders.json', { params: { id } })
      .then(({ data }) => dispatch(deleteOrderAction(id)));
  };
};
