// @flow
export default function invariant(predicate: mixed, errorMessage: string) {
  if (!predicate) {
    console.error(errorMessage)
  }
}
