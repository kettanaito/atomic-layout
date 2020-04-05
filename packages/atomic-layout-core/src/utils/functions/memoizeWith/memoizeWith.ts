const memoizeWith = <F extends (...args: any[]) => any>(
  saltGenerator: (...args: Parameters<F>) => string,
) => {
  const cache: Record<string, any> = {}

  return (func: F) =>
    function(...args: Parameters<F>): ReturnType<F> {
      const key = saltGenerator(...args)

      if (!(key in cache)) {
        cache[key] = func(...args)
      }

      return cache[key]
    }
}

export default memoizeWith
