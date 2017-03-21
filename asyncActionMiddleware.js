'use strict';

const Redux = require('redux');

const logger = store => nextDispatch => action => {
  console.log('start', action.type);
  let result = nextDispatch(action);
  console.log('end', action.type);
  return result;
};

const thunk = store => nextDispatch => action => {
  if (typeof action === 'function') {
    action(nextDispatch);
  } else {
    nextDispatch(action);
  }
}

const createStore = Redux.applyMiddleware(thunk, logger)(Redux.createStore);

function thunkAction (name) {
  return dispatch => {
    setTimeout(function() {
      dispatch({
        type: 'changeName',
        name
      });
    }, 3000);
  }
}

function reducer (state, action) {
  if (typeof state === 'undefined') return {name: ''};
  switch(action.type) {
    case 'changeName':
      return {name: action.name};
    default:
      return state;
  }
}

const store = createStore(reducer, {name: ''});

store.subscribe(() => {
  console.log('reuslt => ', store.getState());
});

store.dispatch(thunkAction('yejia'));

console.log('first');