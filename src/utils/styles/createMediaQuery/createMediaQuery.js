// @flow
import type {
  Breakpoint,
  BreakpointBehavior,
} from '../../../const/defaultOptions'
import transformNumeric from '../../math/transformNumeric'
import toDashedString from '../../strings/toDashedString'

const shouldAppendProp = (propName: string, behavior: BreakpointBehavior) => {
  const [prefix, splitPropName] = propName.split('-')
  const isDimensionalProp = ['height', 'width'].includes(splitPropName)

  if (!isDimensionalProp) {
    return true
  }

  return (
    (prefix === 'min' && ['up', 'only'].includes(behavior)) ||
    (prefix === 'max' && ['down', 'only'].includes(behavior))
  )
}

export default function createMediaQuery(
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): string {
  const mediaQueryParts = Object.keys(breakpoint).reduce(
    (acc: string[], propName) => {
      const pristinePropValue: $Values<Breakpoint> = breakpoint[propName]
      const propValue = transformNumeric(pristinePropValue)
      const dashedPropName = toDashedString(propName)

      return shouldAppendProp(dashedPropName, behavior)
        ? acc.concat(`(${dashedPropName}:${String(propValue)})`)
        : acc
    },
    [],
  )

  return mediaQueryParts.join(' and ')
}
