'use strict';

const Redux = require('redux');
const createStore = Redux.createStore;
const combineReducers = Redux.combineReducers;

// state -> {a:[], b:[]}

// action A -> {type, data(String)}

// const reducers = {
//   a: function(state, action) {},
//   b: function(state, action) {}
// };

// state参数对应的是state.a
function aReducer(state, action) {
  if (typeof state === 'undefined') return [];
  switch (action.type) {
    case 'a':
      // state.push(action.data); x
      // return state; x
      return state.concat([action.data]);
    default:
      return state;
  }
}

function bReducer(state, action) {
  if (typeof state === 'undefined') return [];
  switch (action.type) {
    case 'b':
      // state.push(action.data); x
      // return state; x
      return state.concat([action.data]);
    default:
      return state;
  }
}

const reducer = combineReducers({ a: aReducer, b: bReducer });

const store = createStore(reducer, { a: [111], b: [222] });

store.subscribe(function listener() {
  console.log(store.getState());
});

let actionA = {
  type: 'a',
  data: 'alice'
}
let actionB = {
  type: 'b',
  data: 'baby'
}
// store.dispatch(actionA);
// store.dispatch(actionB);
combineReducers(actionA, actionB);