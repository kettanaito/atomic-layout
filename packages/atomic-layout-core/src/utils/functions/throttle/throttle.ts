/**
 * Throttles a given function.
 * Implements both leading and trailing function calls.
 */
export default function throttle<F extends (...args: any[]) => any>(
  func: F,
  interval: number,
) {
  let previous: number
  let queuedToRun: NodeJS.Timeout = null

  return function invoker(...args: Parameters<typeof func>): void {
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
