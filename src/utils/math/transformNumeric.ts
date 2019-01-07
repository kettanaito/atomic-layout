import Layout from '../../Layout'

export default function transformNumeric(
  value?: number | string,
): string | void {
  if (!value) {
    return
  }

  const suffix = typeof value === 'number' ? Layout.defaultUnit : ''

  return `${value}${suffix}`
}
