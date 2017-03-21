'use strict';
const Redux = require('redux');
const applyMiddleware = Redux.applyMiddleware;

const logger = store => nextDispatch => action => {
  console.log('start', action.type);
  let result = nextDispatch(action);
  console.log('end', action.type);
  return result;
};

const createStore = applyMiddleware(logger)(Redux.createStore); // 返回一个装载好中间件的createStore

const reducer = function reducer(state, action) {
  if( typeof state === 'undefined') return {name: ''};
  switch (action.type) {
    case 'changeName': 
      return {name: action.name}
    default:
      return state;
  }
};

const store = createStore(reducer, {name: 'alice'});
store.subscribe(() => console.log(store.getState()));
store.dispatch({type: 'changeName', name: 'yejia'});