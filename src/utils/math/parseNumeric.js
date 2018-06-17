// @flow
import type { Numeric, TMeasurementUnit } from '../../const/defaultOptions'
import toNumber from '../toNumber'
import Layout from '../../Layout'

type TParsedNumeric = {
  value: number,
  unit: TMeasurementUnit,
}

/**
 * Returns the parsed numeric Object from the given measurement unit.
 * @example
 * parseNumeric(24) // { value: 24, unit: 'px' (default) }
 * parseNumeric('15rem') // { value: 15, unit: 'rem' }
 */
export default function parseNumeric(numeric: Numeric): TParsedNumeric {
  const parsed = /(\d+)(?=(.+)?)/g.exec(numeric)
  return {
    value: parsed && parseInt(parsed[1], 10),
    unit: (parsed && parsed[2]) || Layout.defaultUnit,
  }
}
