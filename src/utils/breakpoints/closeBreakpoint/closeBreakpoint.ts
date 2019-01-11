import { Breakpoint } from '../../../const/defaultOptions'
import getPrefix from '../../strings/getPrefix'

/**
 * Accepts a breakpoint and returns a new breakpoint where
 * all the "min" properties of the original breakpoint are
 * flipped into the "max" properties. Any "max" properties
 * of the original breakpoint are omitted.
 *
 * @example
 * flipBreakpoint({ minWidth: 500, maxWidth: 600 })
 * // { maxWidth: 499 }
 */
export default function flipBreakpoint(breakpoint: Breakpoint): Breakpoint {
  return Object.keys(breakpoint)
    .map(([propName, propValue]) => [getPrefix(propName), propName, propValue])
    .filter(([prefix]) => prefix !== 'max')
    .reduce<Breakpoint>((newBreakpoint, [prefix, propName]) => {
      const hasMinPrefix = prefix === 'min'
      const nextPropName = hasMinPrefix
        ? propName.replace(/^min/, 'max')
        : propName

      /**
       * Subtracts 1 from the edge to not include the area at the beginning
       * of the breakpoint.
       *
       * @todo
       * How is "parseFloat" going to work with non-dimensional options?
       * (i.e. aspectRatio)
       */
      const prevValue = breakpoint[propName]
      const nextValue = hasMinPrefix
        ? parseFloat(String(prevValue)) - 1
        : prevValue

      return {
        ...newBreakpoint,
        [nextPropName]: nextValue,
      }
    }, {})
}
