// 合并函数
export default function compose(...funcs) {
  // 处理没有传入中间件的情况
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  // 处理只有一个中间件的情况
  if (funcs.length === 1) {
    return funcs[0];
  }

  // 对函数进行累加处理
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
