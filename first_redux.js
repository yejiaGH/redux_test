const Redux = require('redux');
// reducer是一个纯函数
const reducer = function (state, action) {
  if (action.type === 'changeName') {
    console.log('changeName');
    return Object.assign({}, state, { name: action.name });
    // 或者通过JSON.parse新建对象，不能直接更改state
    // var newState = JSON.parse(JSON.stringify(state));
    // return Object.assign({}, state, newState);
  } else {
    return state; // 没有匹配的action.type就返回原来的state
  }
}
// 初始化设置
const store = Redux.createStore(reducer, { name: 'alice' });
store.subscribe(() => console.log(store.getState()));

function callAction() {
  var promiseAction = new Promise(function (resolve, reject) {
    setTimeout(function () {
      var action = {
        type: 'test',
        data: {
          name: 'alice'
        }
      };
      resolve(action);
    }, 1000);
  });
  promiseAction.then(function (action) {
    store.dispatch(action);
  });
}
const action = {
  type: 'changeName',
  name: 'baby'
}
// store.dispatch(action);
callAction();