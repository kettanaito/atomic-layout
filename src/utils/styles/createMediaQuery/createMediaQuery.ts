import { Breakpoint, BreakpointBehavior } from '@const/defaultOptions'
import isset from '@utils/functions/isset'
import transformNumeric from '@utils/math/transformNumeric'
import toDashedString from '@utils/strings/toDashedString'

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

export function normalizeQuery(queryProps: Breakpoint): any {
  return Object.entries<string>(queryProps)
    .filter(([_, propValue]) => isset(propValue))
    .map(([propName, propValue]) => [toDashedString(propName), propValue])
}

export default function createMediaQuery(
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): string {
  return normalizeQuery(breakpoint)
    .filter(([dashedPropName]) =>
      shouldAppendProp(dashedPropName as string, behavior),
    )
    .map(([dashedPropName, propValue]) => {
      return `(${dashedPropName}:${String(transformNumeric(propValue))})`
    })
    .join(' and ')
}
