import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    console.log(email, password, '<<<<');
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVaUQ3C9LznTw94U2mkgzFrKvXW3n2LiI';
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVaUQ3C9LznTw94U2mkgzFrKvXW3n2LiI';
    }
    axios
      .post(url, authData)
      .then(({ data }) => {
        console.log(data);
        dispatch(authSuccess(data.idToken, data.localId));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
