/**
 * Converts given cammelCase string into kebab-case.
 * @example
 * toDashedString('fooBar')
 * @returns "foo-bar"
 */
export default function toDashedString(str: string): string {
  return str.replace(/[A-Z]/g, (capitalLetter) => {
    return `-${capitalLetter}`.toLowerCase()
  })
}
