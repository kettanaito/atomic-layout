import { Breakpoint } from '@const/defaultOptions'
import getPrefix from '@utils/strings/getPrefix'

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
  return Object.entries(breakpoint)
    .map(([propName, propValue]) => [getPrefix(propName), propName, propValue])
    .filter(([prefix]) => prefix !== 'max')
    .reduce<Breakpoint>((newBreakpoint, [prefix, propName, propValue]) => {
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
      const nextValue = hasMinPrefix
        ? parseFloat(String(propValue)) - 1
        : propValue

      return {
        ...newBreakpoint,
        [nextPropName]: nextValue,
      }
    }, {})
}
