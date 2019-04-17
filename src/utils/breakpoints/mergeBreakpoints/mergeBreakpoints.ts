import { AreaBreakpoint } from '../getAreaBreakpoints'
import Layout from '@src/Layout'
import defaultOptions from '@const/defaultOptions'
// import transformNumeric from '@utils/math/transformNumeric'
import getPrefix from '@utils/strings/getPrefix'

/**
 * Merges two given mergable breakpoints.
 */
export default function mergeBreakpoints(
  breakpointA: AreaBreakpoint,
  breakpointB: AreaBreakpoint,
  includesArea: boolean,
): AreaBreakpoint {
  const { behavior: prevBehavior } = breakpointB
  const { behavior: nextBehavior } = breakpointA

  const wentUp = prevBehavior === 'up'
  const goesDown = nextBehavior === 'down'
  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown
  const shouldStretch = wentUp

  const mergedBreakpoint = { ...breakpointB, ...breakpointA }

  return Object.keys(mergedBreakpoint).reduce<AreaBreakpoint>(
    (acc, propName) => {
      let nextValue = mergedBreakpoint[propName]
      const prefix = getPrefix(propName)

      if (propName === 'behavior') {
        if (!includesArea && shouldStretch) {
          nextValue = 'down'
        }
      }

      if (prefix === 'max') {
        if (!includesArea && shouldStretch) {
          const mirrorValue = breakpointA[propName.replace(/^max/, 'min')]
          nextValue = `calc(${Layout.transformNumeric(mirrorValue)} - 1px)`
        }
      }

      if (prefix === 'min') {
        if (includesArea) {
          if (behavesSame || behavesInclusive) {
            nextValue = breakpointB[propName]
          }
        } else {
          if (shouldStretch) {
            nextValue = breakpointB[propName]
          }
        }
      }

      return {
        ...acc,
        [propName]: nextValue,
      }
    },
    {
      behavior: defaultOptions.defaultBehavior,
    },
  )
}
