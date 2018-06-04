// @flow
/**
 * Returns the shallow copy of the given array with
 * the last element removed.
 */
export default function pop<T>(arr: T[]): T[] {
  return arr.slice(0, arr.length - 1)
}
