import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleWare from 'redux-thunk'

const reducer = {};
const ctx = require.context('./', false, /\.ts$/);


const store = createStore(
  combineReducers(reducer),
  applyMiddleware(thunkMiddleWare)
);
export default store;