import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isLoading: false,
  orders: [],
  purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.id
  });
  return updateObject(state, {
    isLoading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    isLoading: false
  });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    isLoading: true
  });
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { isLoading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    isLoading: false
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {
    isLoading: false
  });
};

const deleteOrder = (state, action) => {
  const newOrdersList = state.orders.filter(order => order.id !== action.id);
  return updateObject(state, {
    orders: newOrdersList
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    case actionTypes.DELETE_ORDER:
      return deleteOrder(state, action);

    default:
      return state;
  }
};

export default reducer;
