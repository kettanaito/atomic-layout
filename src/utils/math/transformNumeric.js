// @flow
import Layout from '../../Layout'

export default function transformNumeric(value?: number | string): ?string {
  if (!value) {
    return
  }

  const suffix = Number.isInteger(value) ? Layout.defaultUnit : ''

  return `${value}${suffix}`
}
