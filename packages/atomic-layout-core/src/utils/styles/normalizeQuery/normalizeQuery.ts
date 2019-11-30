import { Numeric, Breakpoint } from '../../../const/defaultOptions'
import isset from '../../functions/isset'
import toDashedString from '../../strings/toDashedString'

/**
 * Normalizes given media query object to a list of [propName, propValue].
 * @example
 * normalizeQuery({ minWidth: 120 })
 * // [['min-width', 120]]
 */
export default function normalizeQuery(
  queryProps: Breakpoint,
): Array<[string, Numeric]> {
  return Object.entries<Numeric>(queryProps)
    .filter(([_, propValue]) => isset(propValue))
    .map<[string, Numeric]>(([propName, propValue]) => [
      toDashedString(propName),
      propValue,
    ])
}
