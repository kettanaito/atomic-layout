import Layout from '../../Layout'
import isset from '../functions/isset'

export default function transformNumeric(value?: number | string): string {
  if (!isset(value)) {
    return ''
  }

  /**
   * Suffix numeric value with the default unit.
   * Accept explicit (string) value as-is.
   *
   * When given value is zero then its generated as it is, no suffix is attached
   */
  const suffix =
    typeof value === 'number' && value !== 0 ? Layout.defaultUnit : ''

  return `${value}${suffix}`
}
