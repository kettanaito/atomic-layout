// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../const/defaultOptions'
import toDashedString from './toDashedString'
import transformNumeric from './transformNumeric'

const shoulAppendProp = (propName: string, behavior: TBreakpointBehavior) => {
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
  breakpoint: TBreakpoint,
  behavior: TBreakpointBehavior,
): string {
  const mediaQueryParts = Object.keys(breakpoint).reduce(
    (acc: string[], propName) => {
      const pristinePropValue: $Values<TBreakpoint> = breakpoint[propName]
      const propValue = transformNumeric(pristinePropValue)
      const dashedPropName = toDashedString(propName)
      const shouldConcat = shoulAppendProp(dashedPropName, behavior)

      console.log(' ')
      console.log('propName:', propName)
      console.log('dashedPropName:', dashedPropName)
      console.log('pristinePropValue:', pristinePropValue)
      console.log('propValue:', propValue)
      console.log('shouldConcat:', shouldConcat)

      return shouldConcat
        ? acc.concat(`(${dashedPropName}:${String(propValue)})`)
        : acc
    },
    [],
  )

  console.log('mediaQueryParts:', mediaQueryParts)

  return mediaQueryParts.join(' and ')
}
