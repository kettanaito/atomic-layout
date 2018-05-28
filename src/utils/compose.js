export default function compose(...funcs) {
  return funcs.reduce((f, g) => (...args) => f(g(...args)))
}
