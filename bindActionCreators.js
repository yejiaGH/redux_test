const Redux = require('redux');
const store = Redux.createStore(function reducer(state, action) {
  if (typeof state === 'undefined') return {};
  switch(action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name});
    default:
      return {};
  }
});

// ---------------------- one
// const action = {
//   type: 'changeName',
//   name: 'leo'
// };

// store.dispatch(action);

// const action2 = {
//   type: 'changeName',
//   name: 'alice'
// };

// ---------------------- two
// function actionCreator(name) {
//   return {
//     name,
//     type: 'changeName'
//   }
// }

// store.dispatch(actionCreator('alice'));
// store.dispatch(actionCreator('yejia'));

// ---------------------- three
// function createAction(action, dispatch) {
//   return function (opt) {
//     action = Object.assign({}, action, opt, { type: action.type });
//     dispatch(action);
//   }
// }

// var action = createAction({type: 'changeName', name: 'alice'}, store.dispatch);
// action();
// action({name: 'yejia'});

// ---------------------- four
// function createActions (actions, dispatch) {
//   function createAction (action, dispatch) {
//     return function (opt) {
//       action = Object.assign({}, action, opt, {type: action.type});
//       dispatch(action);
//     }
//   }
  
//   if (typeof actions === 'function') {
//     return createAction(actions, dispatch);
//   } else {
//     let result = {};
//     for (var k in action) {
//       result[key] = createAction(actions[k], dispatch);
//     }
//     return result;
//   }  
// }

// let a = {type: 'a'};
// let b = {type: 'b'};
// let c = {type: 'c'};

// let actions = createActions({a, b, c}, store.dispatch);
// actions.a();
// actions.b();

// ---------------------- five
function a(name, id) {
  return {
    type: 'a',
    name,
    id
  }
}

function b(name) {
  return {
    type: 'b',
    name
  }
}

let actions = Redux.bindActionCreators({a, b}, store.dispatch);
actions.a('alice', 'id001');