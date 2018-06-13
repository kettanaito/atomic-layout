// @flow
export default function toLowerCaseFirst(str: string): string {
  return str.slice(0, 1).toLowerCase() + str.slice(1, str.length)
}
