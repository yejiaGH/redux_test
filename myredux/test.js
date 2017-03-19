'use strict';
const { createStore, useMiddleware } = require('./index');
const logger = store => next => action => {
  // 加个中间件实现日志功能
  console.log('Action begin', action.type);
  next.call(store, action);
  console.log('Action end', action.type);
};

const store = createStore(function (state, action) {
  if (action.type === 'changeName') {
    return {
      name: action.name
    };
  } else {
    return state;
  }
}, {name: 'alice'});

useMiddleware(store, [logger]);
store.listen(() => {
  console.log(store.state);
});
store.dispatch({
  type: 'changeName',
  name: 'baby'
});
