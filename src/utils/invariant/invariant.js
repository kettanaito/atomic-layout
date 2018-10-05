// @flow
export default function invariant(
  predicate: mixed,
  errorMessage: string,
): void {
  if (!predicate) {
    console.error(errorMessage)
  }
}
