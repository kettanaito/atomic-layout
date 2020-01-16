export const keywords = [
  // Dot symbol (and its sequence) is a valid placeholder,
  // but not a valid CSS Grid area name.
  /\.+/,
  // Numbers may be present in `grid-template` definition
  // and describe dimensions of rows/columns.
  /^[0-9]/,
  // Slash is a special symbol used to declare dimensions
  // for columns.
  '/',
  // "auto" is a reserved keyword to describe an automatic
  // dimension value when sizing rows/columns.
  'auto',
]

/**
 * Determines if a given string is a valid CSS Grid area name.
 * Takes into account row/column dimensions and reserved
 * keywords used in the `grid-template` definition.
 */
export default function isAreaName(areaName: string): boolean {
  return keywords.every((keyword) => {
    return keyword instanceof RegExp
      ? !keyword.test(areaName)
      : areaName !== keyword
  })
}
