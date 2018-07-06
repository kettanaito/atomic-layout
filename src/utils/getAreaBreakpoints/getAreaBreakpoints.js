// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
import type { TTemplate } from '../getAreasList'
import pop from '../pop'
import when from '../when'
import spread from '../spread'
import compose from '../compose'
import mergeBreakpoints from '../mergeBreakpoints'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'
import openBreakpoint from './openBreakpoint'

export type TAreaBreakpoint = TBreakpoint & {
  behavior: TBreakpointBehavior,
}

type TAreaBreakpointsList = Array<?TAreaBreakpoint>

type TAreaBreakpointTuple = [
  TAreaBreakpoint,
  ?TAreaBreakpoint,
  boolean,
  boolean,
  TAreaBreakpointsList,
]

const updateWith = (key: string, updateFunc) => {
  return (args) => {
    const [first, ...rest] = args // eslint-disable-line
    return [updateFunc(args), ...rest]
  }
}

const createContext = (areaName: string) => {
  return (
    areaBreakpointsList,
    template,
    index,
    templates,
  ): TAreaBreakpointTuple => {
    const isLastTemplate = index === templates.length - 1
    const { areas, behavior, breakpoint } = template
    const includesArea = areas.includes(areaName)
    const prevAreaBreakpoint =
      areaBreakpointsList[areaBreakpointsList.length - 1]
    const nextAreaBreakpoint = {
      ...breakpoint,
      behavior,
    }

    const context = [
      nextAreaBreakpoint,
      prevAreaBreakpoint,
      includesArea,
      isLastTemplate,
      areaBreakpointsList,
    ]

    return context
  }
}

const shouldMerge = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
]: TAreaBreakpointTuple): boolean => {
  const { behavior: prevBehavior, ...prevBreakpoint } = prevAreaBreakpoint || {}
  const { behavior: nextBehavior, ...nextBreakpoint } = nextAreaBreakpoint

  return (
    !!prevAreaBreakpoint &&
    shouldMergeBreakpoints(prevBreakpoint, nextBreakpoint)
  )
}

const shouldOpenBreakpoint = ([
  nextAreaBreakpoint,
  _prevAreaBreakpoint,
  _includesArea,
  isLastTemplate,
]: TAreaBreakpointTuple): boolean => {
  return isLastTemplate && nextAreaBreakpoint.behavior === 'up'
}

const updateBreakpointsList = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  _isLastTemplate,
  areaBreakpointsList,
]: TAreaBreakpointTuple): TAreaBreakpointsList => {
  const { behavior: prevBehavior } = prevAreaBreakpoint || {}
  const { behavior: nextBehavior } = nextAreaBreakpoint
  const wentUp = prevBehavior === 'up'
  const goesDown = nextBehavior === 'down'
  const shouldStretch = wentUp

  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown
  let shouldReplaceLast = includesArea && (behavesSame || behavesInclusive)

  let newBreakpoint = nextAreaBreakpoint

  if (!includesArea) {
    newBreakpoint = shouldStretch ? [nextAreaBreakpoint, null] : null

    if (shouldStretch) {
      shouldReplaceLast = true
    }
  }

  const targetList = shouldReplaceLast
    ? pop(areaBreakpointsList)
    : areaBreakpointsList

  debugger

  return targetList.concat(newBreakpoint)
}

const getAreaBreakpoints = (
  areaName: string,
  templates: TTemplate[],
): TAreaBreakpointsList =>
  templates.reduce(
    compose(
      updateBreakpointsList,
      when(
        shouldOpenBreakpoint,
        updateWith('nextAreaBreakpoint', spread(openBreakpoint)),
      ),
      when(
        shouldMerge,
        updateWith('nextAreaBreakpoint', spread(mergeBreakpoints)),
      ),
      createContext(areaName),
    ),
    [],
  )

export default getAreaBreakpoints
