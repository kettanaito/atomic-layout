// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../const/defaultOptions'
import toDashedString from './toDashedString'

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
      const propValue: $Values<TBreakpoint> = breakpoint[propName]
      const dashedPropName = toDashedString(propName)
      const shouldConcat = shoulAppendProp(dashedPropName, behavior)

      return shouldConcat
        ? acc.concat(`(${dashedPropName}:${String(propValue)})`)
        : acc
    },
    [],
  )

  return mediaQueryParts.join(' and ')
}
