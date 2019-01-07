// @flow
export default function memoizeWith(mappingFunc: (...args: mixed[]) => string) {
  const cache = {}

  return (func) =>
    function() {
      const key = mappingFunc.apply(this, arguments)

      if (!(key in cache)) {
        cache[key] = func.apply(this, arguments)
      }

      return cache[key]
    }
}
