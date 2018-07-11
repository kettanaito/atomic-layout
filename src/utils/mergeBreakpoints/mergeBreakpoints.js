// @flow
import type { TAreaBreakpoint } from '../getAreaBreakpoints'
import transformNumeric from '../math/transformNumeric'
import getPrefix from '../getAreaBreakpoints/getPrefix'

export default function mergeBreakpoints(
  nextBreakpoint: TAreaBreakpoint,
  prevBreakpoint: TAreaBreakpoint,
  includesArea: boolean,
): TAreaBreakpoint {
  const { behavior: prevBehavior } = prevBreakpoint
  const { behavior: nextBehavior } = nextBreakpoint

  const wentUp = prevBehavior === 'up'
  const goesDown = nextBehavior === 'down'
  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown
  const shouldStretch = wentUp

  const mergedBreakpoint = { ...prevBreakpoint, ...nextBreakpoint }

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
        const mirrorValue = nextBreakpoint[propName.replace(/^max/, 'min')]
        nextValue = `calc(${transformNumeric(mirrorValue)} - 1px)`
      }
    }

    if (prefix === 'min') {
      if (includesArea) {
        if (behavesSame || behavesInclusive) {
          nextValue = prevBreakpoint[propName]
        }
      } else {
        if (shouldStretch) {
          nextValue = prevBreakpoint[propName]
        }
      }
    }

    return {
      ...acc,
      [propName]: nextValue,
    }
  }, {})
}
