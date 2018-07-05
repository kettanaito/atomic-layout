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
  const goesUp = nextBehavior === 'up'
  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown
  const shouldStretch = wentUp

  console.log('trying to merge:')
  console.log('prev:', prevBreakpoint)
  console.log('next:', nextBreakpoint)
  console.log({ includesArea })
  console.log({ wentUp })
  console.log({ goesDown })
  console.log({ goesUp })
  console.log({ behavesSame })
  console.log({ behavesInclusive })
  console.log({ shouldStretch })

  const cargo = { ...prevBreakpoint, ...nextBreakpoint }
  console.log({ cargo })

  return Object.keys(cargo).reduce((acc, propName) => {
    let nextValue = cargo[propName]
    const prefix = getPrefix(propName)

    console.log(`analyzing "${propName}" with original value "${nextValue}"`)
    console.log('prefix?', prefix)

    if (propName === 'behavior') {
      if (!includesArea && shouldStretch) {
        nextValue = 'down'
      }
    }

    if (prefix === 'max') {
      console.log('has "max" prefix!')

      if (!includesArea && shouldStretch) {
        console.log('does NOT include array, but SHOULD STRETCH!')
        console.log(
          `--- setting "${propName}" value to "${
            prevBreakpoint[propName.replace(/^max/, 'min')]
          }" (prev breakpoint mirrored value)`,
        )

        nextValue = nextBreakpoint[propName.replace(/^max/, 'min')]
      }
    }

    if (prefix === 'min') {
      console.log('prefix is "min"')

      if (includesArea) {
        console.log('template includes the area!')
        if (behavesSame || behavesInclusive) {
          console.log('has same or inclusive behavior!')
          console.log(
            `--- setting "${propName}" value to "${
              prevBreakpoint[propName]
            }" (prev breakpoint value)`,
          )

          nextValue = prevBreakpoint[propName]
        }
      } else {
        console.log('does NOT include the area!')

        if (shouldStretch) {
          console.log('should stretch!')
          console.log(
            `--- setting "${propName}" value to "${
              prevBreakpoint[propName]
            }" (prev breakpoint value)`,
          )

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
