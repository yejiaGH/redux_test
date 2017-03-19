const Redux = require('redux');
const reducer = function (state, action) {
  if (action.type === 'cangeName') {
    return Object.assign({}, state, {name: action.name});
  } else {
    return state;
  }
}
const store = Redux.createStore(reducer, {name: 'alice'});
store.subscribe(() => console.log(store.getState()));
const action = {
  type: 'changeName',
  name: 'baby'
}
store.dispatch(action);