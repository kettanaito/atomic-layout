/**
 * @param {Number|String|null} value
 */
export default function toRem(value) {
  if (!value) {
    return
  }

  const suffix = Number.isInteger(value) ? 'rem' : ''

  return `${value}${suffix}`
}
