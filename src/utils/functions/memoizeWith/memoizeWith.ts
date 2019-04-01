interface Cache {
  [key: string]: any
}

export default function memoizeWith(mappingFunc: (...args: any[]) => string) {
  const cache: Cache = {}

  return (func: (...args: any[]) => any) =>
    function(...args: any[]) {
      const key = mappingFunc(...args)

      if (!(key in cache)) {
        cache[key] = func(...args)
      }

      return cache[key]
    }
}
