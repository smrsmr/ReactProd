/* import { createStore, combineReducers, applyMiddleware } from 'redux';
const simpleReducer = function (state = {}, action) {
  return {
    user: {
      name: 'redux'
    }
  };
};

const store = createStore(simpleReducer);

console.log(store.getState()); */
// eslint-disable-next-line no-unused-vars
import { createStore, combineReducers, applyMiddleware } from 'redux';

function shop(state = {num: 0,name:'当前商品总数:0'}, action) {
  switch (action.type) {
  case 'SHOP':
    return {
      ...state,
      num: action.num,
      name: action.name
    };
  }

  return state;
}

/* function project(state = { name: 'min-react' }, action) {

  switch (action.type) {
  case 'CHANGE_STORP_NAME':
    return {
      ...state,
      name: action.name
    };
  }

  return state;
} */


const rootReducer = combineReducers({
  shop
});

/* const store = createStore(rootReducer);
const state = store.getState(); */
export const store = createStore(rootReducer);
