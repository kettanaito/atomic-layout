// @flow
import type { Numeric } from '../../const/defaultOptions'
import Layout from '../../Layout'
import invariant from '../invariant'
import parseNumeric from './parseNumeric'

type TOperation = (a: number, b: number) => number

export default function calc(
  unitA: Numeric,
  unitB: Numeric,
  operation: TOperation,
): Numeric {
  const a = parseNumeric(unitA)
  const b = parseNumeric(unitB)

  invariant(
    a.unit === b.unit,
    `Cannot perform a calculation: required both dimensions to have the same measurement unit, but got: "${
      a.unit
    }", "${b.unit}"`,
  )

  const result = operation(a.value, b.value)
  const isDefaultUnit = Layout.defaultUnit === a.unit

  const { unit } = a
  return unit && !isDefaultUnit ? `${result}${unit}` : result
}
