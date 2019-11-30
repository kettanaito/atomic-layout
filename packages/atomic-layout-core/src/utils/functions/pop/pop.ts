/**
 * Returns the shallow copy of the given array with
 * the last element removed.
 */
export default function pop<T>(list: T[]): T[] {
  return list.slice(0, list.length - 1)
}
