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
   * @todo MAKE SURE RETURNING AN EMPTY STRING RESULTS INTO
   * PROPER CSS PROPERTIES SET IN THE GENERATED STYLES.
   */
  const suffix = typeof value === 'number' ? Layout.options.defaultUnit : ''

  return `${value}${suffix}`
}
