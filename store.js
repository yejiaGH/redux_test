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

const sto = new Store({name: 'alice', num: 5});

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

sto.setUpdates({
  name: nameUpdater,
  num: numUpdater
});

sto.listen(() => {
  console.log(sto.state);
});
const action = {
  type: '+'
};
const action2 = {
  type: '-'
};
const action3 = {
  type: 'changeName',
  name: 'baby'
}
sto.dispatch(action);
sto.dispatch(action2);
sto.dispatch(action3);