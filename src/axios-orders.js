import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-31ab8.firebaseio.com/'
});

export default instance;
