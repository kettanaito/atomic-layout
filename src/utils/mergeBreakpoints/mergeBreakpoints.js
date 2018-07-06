// @flow
import type { TAreaBreakpoint } from '../getAreaBreakpoints'
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

  const cargo = { ...prevBreakpoint, ...nextBreakpoint }

  return Object.keys(cargo).reduce((acc, propName) => {
    let nextValue = cargo[propName]
    const prefix = getPrefix(propName)

    if (propName === 'behavior') {
      if (!includesArea && shouldStretch) {
        nextValue = 'down'
      }
    }

    if (prefix === 'max') {
      if (!includesArea && shouldStretch) {
        // TODO
        // Needs to have lookbehind to assure stretched area doesn't render
        // together with the upcoming areas.
        nextValue = nextBreakpoint[propName.replace(/^max/, 'min')] - 1
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

    debugger

    return {
      ...acc,
      [propName]: nextValue,
    }
  }, {})
}
