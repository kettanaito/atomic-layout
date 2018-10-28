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
 *
 * @param {Breakpoint} breakpoint
 * @returns {Breakpoint}
 */
export default function flipBreakpoint(breakpoint) {
  return (
    Object.keys(breakpoint)
      /* Store the prefix of each property */
      .map((propName) => [getPrefix(propName), propName])
      /* Omit all properties starting from "max" */
      .filter(([prefix]) => prefix !== 'max')
      /* Reduce to a new breakpoint */
      .reduce((flippedBreakpoint, [prefix, propName]) => {
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
          ? parseFloat(breakpoint[propName]) - 1
          : breakpoint[propName]

        return {
          ...flippedBreakpoint,
          [nextPropName]: nextValue,
        }
      }, {})
  )
}
