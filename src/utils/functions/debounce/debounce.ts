export default function debounce(
  func: (...args: any[]) => any,
  duration: number = 250,
) {
  let timeout: number

  return (...args: any[]) => {
    const postpone = () => {
      timeout = null
      return func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(postpone, duration)
  }
}
