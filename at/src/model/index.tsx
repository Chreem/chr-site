import {createStore, combineReducers, applyMiddleware, Reducer} from 'redux'
import thunkMiddleWare from 'redux-thunk'

const reducer: { [all: string]: Reducer } = {};
const ctx = require.context('./', false, /\.ts$/);
ctx.keys().map(key => {
  reducer[key.slice(
    key.indexOf('./') + 2,
    key.indexOf('.ts')
  )] = ctx(key).reducer
});

const store = createStore(
  combineReducers(reducer),
  applyMiddleware(thunkMiddleWare)
);
export default store;