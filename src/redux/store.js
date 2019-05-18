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
import { createStore, combineReducers, applyMiddleware,compose  } from 'redux';
//redux 异步
import thunk from 'redux-thunk';
import { INCREASE,SUBTRACT } from './actions';
/**
 * 修改state 只能通过提交action
 */
/* function shop(state = { num: 0, name: '当前商品总数:0' }, action) {
  switch (action.type) {
  case 'SHOP':
    return {
      ...state,
      num: action.num,
      name: action.name
    };
  default:
    return state;
  }
	
} */
function num(state=0,action) {
  switch (action.type) {
  case INCREASE: 
    return state + 1;
  
  case SUBTRACT: 
    return state - 1;
		
  default: 
    return state;
  }
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
  // shop
  num
});

//可以异步分发action
const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
const store = finalCreateStore(rootReducer, {});
export default store;

/* const store = createStore(rootReducer);
const state = store.getState(); */
// export const store = createStore(rootReducer);
