// @flow
import type {
  Breakpoint,
  BreakpointBehavior,
} from '../../../const/defaultOptions'
import type { Template } from '../../templates/getAreasList'
import pop from '../../functions/pop'
import when from '../../functions/when'
import spread from '../../functions/spread'
import compose from '../../functions/compose'
import mergeBreakpoints from '../mergeBreakpoints'
import openBreakpoint from '../openBreakpoint'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'

export type AreaBreakpoint = Breakpoint & {
  behavior: BreakpointBehavior,
}

type AreaBreakpointsList = Array<?AreaBreakpoint>

type AreaBreakpointTuple = [
  AreaBreakpoint,
  ?AreaBreakpoint,
  boolean,
  boolean,
  boolean,
  AreaBreakpointsList,
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
  ): AreaBreakpointTuple => {
    const isLastTemplate = index === templates.length - 1
    const { areas, behavior, breakpoint } = template
    const includesArea = areas.includes(areaName)
    const prevAreaBreakpoint =
      areaBreakpointsList[areaBreakpointsList.length - 1]
    const nextAreaBreakpoint = {
      ...breakpoint,
      behavior,
    }

    const { behavior: x, ...prevBreakpoint } = prevAreaBreakpoint || {}
    const shouldMerge =
      prevAreaBreakpoint && shouldMergeBreakpoints(prevBreakpoint, breakpoint)

    const context = [
      nextAreaBreakpoint,
      prevAreaBreakpoint,
      includesArea,
      isLastTemplate,
      shouldMerge,
      areaBreakpointsList,
    ]

    return context
  }
}

const canMergeBreakpoints = ([
  _nextAreaBreakpoint,
  _prevAreaBreakpoint,
  _includesArea,
  _isLastTemplate,
  shouldMerge,
]: AreaBreakpointTuple): boolean => {
  return shouldMerge
}

const shouldOpenBreakpoint = ([
  nextAreaBreakpoint,
  _prevAreaBreakpoint,
  _includesArea,
  isLastTemplate,
]: AreaBreakpointTuple): boolean => {
  return isLastTemplate && nextAreaBreakpoint.behavior === 'up'
}

const updateBreakpointsList = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  _isLastTemplate,
  shouldMerge,
  areaBreakpointsList,
]: AreaBreakpointTuple): AreaBreakpointsList => {
  /* Fallback to an empty object when there is no previous breakpoint in the list */
  const { behavior: prevBehavior } = prevAreaBreakpoint || {}
  const { behavior: nextBehavior } = nextAreaBreakpoint

  const wentUp = prevBehavior === 'up'
  const goesDown = nextBehavior === 'down'
  const behavesSame = prevBehavior === nextBehavior
  const behavesInclusive = wentUp && goesDown

  /* Alias for better readability */
  const shouldStretch = wentUp
  let shouldReplaceLastArea = includesArea && (behavesSame || behavesInclusive)

  if (!shouldMerge) {
    shouldReplaceLastArea = false
  }

  let newBreakpoint = [nextAreaBreakpoint]

  if (!includesArea) {
    /**
     * When the area is stretched, append explicit "null" afterward
     * to prevent the stretched area from being treated as a sibling area
     * in any further calculations.
     */
    newBreakpoint = shouldStretch ? [nextAreaBreakpoint, null] : [null]

    if (shouldStretch) {
      shouldReplaceLastArea = true
    }
  }

  const targetList = shouldReplaceLastArea
    ? pop(areaBreakpointsList)
    : areaBreakpointsList

  return targetList.concat(newBreakpoint)
}

const getAreaBreakpoints = (
  areaName: string,
  templates: Template[],
): AreaBreakpointsList =>
  templates.reduce(
    compose(
      updateBreakpointsList,
      when(
        shouldOpenBreakpoint,
        updateWith('nextAreaBreakpoint', spread(openBreakpoint)),
      ),
      when(
        canMergeBreakpoints,
        updateWith('nextAreaBreakpoint', spread(mergeBreakpoints)),
      ),
      createContext(areaName),
    ),
    [],
  )

export default getAreaBreakpoints
