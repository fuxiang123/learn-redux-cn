export default function applyMiddleware(...middlewares) {
  // applyMiddleware本质上就是一个enhancer,所以前面的处理都和enhancer一样
  return (createStore) => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {};

    const middlewareAPI = {
      getState: store.getState,
      // 这里dispatch还未被赋值，只是起个占位作用
      dispatch: (...args) => dispatch(...args),
    };
    // 遍历中间件数组，调用中间件，把getState和dispatch传入第一个参数
    // 中间件的格式是 ({ dispatch, getState }) => next => action => {}
    // 经过这次遍历调用后，中间件就只剩下 next => action => {} 这一部分，next变成了中间件第一个参数
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    // 将处理后的中间件传入compose里
    // 现在的数据结构变成 const result = (...args) => fn1(fn2(fn3(...args)));
    const result = compose(...chain);
    // 由于next变成了中间件第一个参数，当调用中间件时，next便是你调用中间件时传入的参数
    // 这里传入的参数是store.dispatch，所以store.dispatch就是fn3的next，同理，fn2的next就是fn3，fn1的next就是fn2
    // 经过这次调用后，中间件结构由 next => action => {} 变为 action => {}
    // 最终dispatch的结构会变为这样： action=>action=>action=>{}
    const dispatch = result(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
