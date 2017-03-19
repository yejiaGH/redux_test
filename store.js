'use strict';
// Store
const EventEmitter = require('events').EventEmitter;
class Store {
  constructor(state) {
    this._state = state || {};
    this._updates = {};
    this._emitter = new EventEmitter;
  }

  get state() {
    return JSON.parse(JSON.stringify(this._state));
  }

  // fns - function or object
  setUpdates (fns) {
    this._updates = fns;
  }

  // action
  dispatch (action) {
    if (typeof this._updates === 'function') {
      this._state = this._updates(this.state, action); // return new State;
    } else {
      let newState = {};
      const keys = Object.keys(this._updates);
      keys.forEach(key => {
        let updater = this._updates[key];
        let value = this.state[key];
        let newSubState = updater(value, action);
        newState[key] = newSubState;
      });
      this._state = Object.assign({}, this.state, newState);
    }
    
    this._emitter.emit('change');
  }

  // add listener
  listen(listener) {
    this._emitter.on('change', listener);
  }
}

function createStore(updaters, defaultState) {
  const sto = new Store(defaultState);
  sto.setUpdates(updaters);
  return sto;
}

function createChangeAction (name) {
  return {
    type: 'changeName',
    name
  }
}


function numUpdater (oldNum, action) {
  let num = {};
  switch (action.type) {    
    case '+':
      return ++oldNum;
    case '-':
      return --oldNum;
    default:
      return oldNum;
  }
}

function nameUpdater (oldName, action) {
  if (action.type === 'changeName') {
    return action.name
  } else {
    return oldName;
  } 
}



const sto = createStore({
  name: nameUpdater,
  num: numUpdater
}, {name: 'alice', num: 5});

sto.listen(() => {
  console.log(sto.state);
});
const action = {
  type: '+'
};
const action2 = {
  type: '-'
};

const action3 = createChangeAction('baby');

// sto.dispatch(action);
// sto.dispatch(action2);

function logger (store) {
  let next = store.dispatch;
  store.dispatch = function (action) {
    // 加个中间件实现日志功能
    console.log('Action begin', action.type);
    next.call(store, action);
    console.log('Action end', action.type);
  }  

  return store;
}

 // 异步获得数据
function ajaxData (store) {
  let next = store.dispatch;
  store.dispatch = function (action) {
    if (action.url) {      
      setTimeout(function(){
        action.name = 'baby';
        next.call(store, action);
      }, 1000);
    } else {
      next.call(store, action);
    }    
  }  

  return store;
}

// ajaxData(function(data) {
//   sto.dispatch(createChangeAction(data.name));
// });

// [logger, ajaxData]
function useMiddleware (store, middles) {
  middles.reverse();
  middles.forEach(middle => {
    middle(store);
  });

  return store;
}

useMiddleware(sto, [logger, ajaxData]);

sto.dispatch({
  type: 'changeName',
  url: '///'
})