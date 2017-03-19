'use strict';

let state = {
  aaa: {name: 'leo'},
  bbb: {group: 'javascript'},
  ccc: {age: 23}
}

function update (updaters, state) { 

  let newState = {};

  const keys = Object.keys(updaters);
  keys.forEach(key => {
    let updater = updaters[key] // updater pure function
    let value = state[key]; // aaa => 
    let newSubState = updater(value);
    newState[key] = newSubState;
  });

  let result = Object.assign({}, state, newState);
  console.log(result);
}

function aaaUpdater (subState) {
  return {name: 'alice'}
}

function bbbUpdater (subState) {
  return {group: 'nodejs'}
}

update({
  aaa: aaaUpdater,
  bbb: bbbUpdater
}, state);