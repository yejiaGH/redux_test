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

function callAction () {
  var promiseAction = new Promise(function(resolve, reject){
    setTimeout(function (){
      var action = {
        type: 'test',
        data: {
          name: 'alice'
        }
      };
      resolve(action);
    }, 1000);  
  });
  promiseAction.then(function(action){
    store.dispatch(action);
  });
}
// const action = {
//   type: 'changeName',
//   name: 'baby'
// }
// store.dispatch(action);
callAction();