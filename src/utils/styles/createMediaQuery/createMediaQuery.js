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
  return Object.entries(breakpoint)
    .map(([propName, propValue]) => [toDashedString(propName), propValue])
    .filter(([dashedPropName]) => shouldAppendProp(dashedPropName, behavior))
    .map(([dashedPropName, propValue]) => {
      return `(${dashedPropName}:${String(transformNumeric(propValue))})`
    })
    .join(' and ')
}
