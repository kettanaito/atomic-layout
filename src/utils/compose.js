// @flow
type TFunc = (...args: any[]) => any

export default function compose(...funcs: TFunc[]) {
  return funcs.reduce((f, g) => (...args) => f(g(...args)))
}
