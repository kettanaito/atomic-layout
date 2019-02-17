import { Breakpoint, BreakpointBehavior } from '@const/defaultOptions'
import { Template } from '@utils/templates/getAreasList'
import pop from '@utils/functions/pop'
import when from '@utils/functions/when'
import spread from '@utils/functions/spread'
import compose from '@utils/functions/compose'
import mergeBreakpoints from '../mergeBreakpoints'
import openBreakpoint from '../openBreakpoint'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'

export type AreaBreakpoint = Breakpoint & {
  behavior: BreakpointBehavior
}

type AreaBreakpointsList = Array<AreaBreakpoint | null>

type AreaBreakpointTuple = [
  AreaBreakpoint,
  AreaBreakpoint | null,
  boolean,
  boolean,
  boolean,
  AreaBreakpointsList
]

const updateWith = (key: string, updateFunc: (...args: any[]) => any) => {
  return (args: any) => {
    const [first, ...rest] = args
    return [updateFunc(args), ...rest]
  }
}

const createContext = (areaName: string) => {
  return (
    areaBreakpointsList: AreaBreakpointsList,
    template: Template,
    index: number,
    templates: Template[],
  ): AreaBreakpointTuple => {
    const isLastTemplate = index === templates.length - 1
    const { areas, behavior, breakpoint } = template
    const includesArea = areas.includes(areaName)
    const prevAreaBreakpoint =
      areaBreakpointsList[areaBreakpointsList.length - 1]
    const nextAreaBreakpoint: AreaBreakpoint = {
      ...breakpoint,
      behavior,
    }

    const {
      behavior: prevBehavior,
      ...prevBreakpoint
    } = prevAreaBreakpoint || { behavior: '' }
    const shouldMerge =
      Boolean(prevAreaBreakpoint) &&
      shouldMergeBreakpoints(prevBreakpoint, breakpoint)

    return [
      nextAreaBreakpoint,
      prevAreaBreakpoint,
      includesArea,
      isLastTemplate,
      shouldMerge,
      areaBreakpointsList,
    ]
  }
}

const canMergeBreakpoints = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  isLastTemplate,
  shouldMerge,
]: AreaBreakpointTuple): boolean => {
  return shouldMerge
}

const shouldOpenBreakpoint = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  isLastTemplate,
]: AreaBreakpointTuple): boolean => {
  return isLastTemplate && nextAreaBreakpoint.behavior === 'up'
}

const updateBreakpointsList = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  isLastTemplate,
  shouldMerge,
  areaBreakpointsList,
]: AreaBreakpointTuple): AreaBreakpointsList => {
  /* Fallback to an empty object when there is no previous breakpoint in the list */
  const { behavior: prevBehavior } = prevAreaBreakpoint || {
    behavior: '',
  }
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

  let newBreakpoint: AreaBreakpointsList = [nextAreaBreakpoint]

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
