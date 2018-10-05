// @flow
export type Func = (...args: any[]) => any

export default function compose(...funcs: Func[]) {
  return funcs.reduce((f, g) => (...args) => f(g(...args)))
}
