const keywords = ['/', 'auto']

// Determines if the given string is a valid area name.
// Takes into account on the row/column dimensions and
// keywords in the "grid-template" definition.
export default function isAreaName(areaName: string): boolean {
  const startsWithNumber = /^[0-9]/.test(areaName)
  const isKeyword = keywords.includes(areaName)
  return !startsWithNumber && !isKeyword
}
