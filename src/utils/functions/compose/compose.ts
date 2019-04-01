type Func = (...args: any[]) => any

/**
 * Returns a functional composition of the given functions.
 * Applies no currying.
 */
export default function compose(...funcs: Func[]) {
  return funcs.reduce((f, g) => (...args: any[]) => f(g(...args)))
}
