import { Breakpoint } from '../../../const/defaultOptions'
import getPrefix from '../../strings/getPrefix'

/**
 * Accepts a breakpoint and returns a new breakpoint where
 * all the "min" properties of the original breakpoint are
 * flipped into the "max" properties. Any "max" properties
 * of the original breakpoint are omitted.
 * Subtracts 1 from the numeric values of all "min" properties
 * to not overlap with the given breakpoint.
 *
 * @example
 * flipBreakpoint({ minWidth: 500, maxWidth: 600 })
 * // { maxWidth: 499 }
 */
export default function flipBreakpoint(breakpoint: Breakpoint): Breakpoint {
  return Object.entries(breakpoint)
    .map<[string, string, any]>(([propName, propValue]) => [
      getPrefix(propName),
      propName,
      propValue,
    ])
    .filter(([prefix]) => prefix !== 'max')
    .reduce<Breakpoint>((newBreakpoint, [prefix, propName, propValue]) => {
      const hasMinPrefix = prefix === 'min'
      const nextPropName = hasMinPrefix
        ? propName.replace(/^min/, 'max')
        : propName

      // Parse a breakpoint property value into a numeric value
      // and its measurement unit.
      const [, numericValue, unit] = /(\d+)(.+)?/.exec(propValue)

      /**
       * Subtracts 1 from the edge to not include the area at the beginning
       * of the breakpoint.
       *
       * @todo
       * How is "parseFloat" going to work with non-dimensional options?
       * (i.e. aspectRatio)
       */
      const nextNumericValue = hasMinPrefix
        ? parseFloat(numericValue) - 1
        : numericValue

      // Append back the measurement unit.
      // Prevents breakpoints like { "minWidth": "768px" }
      // becoming { "minWidth": 768 } -> { "minWidth": "768rem" }
      // when the measurement unit is not "px".
      const nextValue = unit ? `${nextNumericValue}${unit}` : nextNumericValue

      return {
        ...newBreakpoint,
        [nextPropName]: nextValue,
      }
    }, {})
}
