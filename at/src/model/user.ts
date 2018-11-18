import {AnyAction, Reducer} from 'redux'
import {ThunkAction} from 'redux-thunk'

export interface UserStoreType {
  user: any,
  login: boolean
}

interface UserActionsType {
  setUserProps<T = any>(prop: string | string[], value: T): AnyAction;
  setLoginState(state: boolean): AnyAction;
  login(...args: any): ThunkAction<Promise<boolean>, UserStoreType, null, AnyAction>;
  check(): ThunkAction<Promise<boolean>, UserStoreType, null, AnyAction>;
}

const initState: UserStoreType = {
  user: {},
  login: false
};

const SET_USER_PROPS = 'SET_USER_PROPS';
const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
const sleep = (t: number) => new Promise(r => setTimeout(r, t));
export const actions: UserActionsType = {
  setUserProps: (prop, value) => ({type: SET_USER_PROPS, prop, value}),
  setLoginState: login => ({type: SET_LOGIN_STATE, login}),

  login: (username, password, keep) => async dispatch => {
    // TODO login function
    await sleep(2000);
    const res = true;
    dispatch(actions.setLoginState(res));
    if (res && keep) localStorage.setItem('token', '1');
    return res;
  },

  check: () => async dispatch => {
    // TODO check login function
    const token = localStorage.getItem('token');
    if (token) dispatch(actions.setLoginState(true));
    return !!token;
  }
};

export const reducer: Reducer<UserStoreType> = (store = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_PROPS:
      const {prop, value} = action;
      store.user[prop] = value;
      return store;
    case SET_LOGIN_STATE:
      store.login = action.login;
      return store;
    default:
      return store;
  }
};