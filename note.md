store
  内部维护state, getState(), 只读

  四个主要功能
  createStore, 创建后返回store的方法的集合
    参数reducer更改器，唯一，根据actiont.type返回新创建的状态对象
    reducer可以拆分成多个小的reducer，用combineReducer合成一个reducer