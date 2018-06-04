// @flow
export default function toRem(value?: number | string): ?string {
  if (!value) {
    return
  }

  const suffix = Number.isInteger(value) ? 'rem' : ''

  return `${value}${suffix}`
}
