// @flow
import type { TAreaBreakpoint } from '../getAreaBreakpoints'
import transformNumeric from '../../math/transformNumeric'
import getPrefix from '../../strings/getPrefix'

export default function mergeBreakpoints(
  breakpointA: TAreaBreakpoint,
  breakpointB: TAreaBreakpoint,
  includesArea: boolean,
): TAreaBreakpoint {
  const { behavior: prevBehavior } = breakpointB
  const { behavior: nextBehavior } = breakpointA

  const wentUp = prevBehavior === 'up'
  const goesDown = nextBehavior === 'down'
  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown
  const shouldStretch = wentUp

  const mergedBreakpoint = { ...breakpointB, ...breakpointA }

  return Object.keys(mergedBreakpoint).reduce((acc, propName) => {
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
        nextValue = `calc(${transformNumeric(mirrorValue)} - 1px)`
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
  }, {})
}
