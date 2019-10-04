/**
 * Throttles a given function.
 * Implements both leading and trailing function calls.
 */
export default function throttle(func, interval: number) {
  let previous: number
  let queuedToRun: number = null

  return function invoker(...args: any[]) {
    const now = Date.now()
    clearTimeout(queuedToRun)

    if (!previous || now - previous >= interval) {
      func.apply(null, args)
      previous = now
    } else {
      queuedToRun = setTimeout(
        invoker.bind(null, ...args),
        interval - (now - previous),
      )
    }
  }
}
