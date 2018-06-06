// @flow
import type { TBreakpoint } from '../const/defaultOptions'
import toDashedString from './toDashedString'

export default function createMediaQuery(breakpoint: TBreakpoint): string {
  const arr: string[] = Object.keys(breakpoint).reduce(
    (acc: string[], propName: string) => {
      const propValue: $Values<TBreakpoint> = breakpoint[propName]
      const dashedPropName = toDashedString(propName)
      return acc.concat(`(${dashedPropName}:${String(propValue)})`)
    },
    [],
  )

  return arr.join(' and ')
}
