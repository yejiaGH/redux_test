'use strict';
const Store = require('./Store');
// 工具方法

// 创建store实例
exports.createStore = function createStore(updaters, defaultState) {
  const sto = new Store(defaultState);
  sto.setUpdates(updaters);
  return sto;
}

// 添加中间件
exports.useMiddleware = function useMiddleware (store, middles) {
  middles.reverse();
  middles.forEach(middle => {
    let next = store.dispatch;
    // 一层一层封装store.dispatch
    store.dispatch = middle(store)(next.bind(store));
  });

  return store;
}
