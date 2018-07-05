// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
import type { TTemplate } from '../getAreasList'
import pop from '../pop'
import compose from '../compose'
import mergeBreakpoints from '../mergeBreakpoints'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'
import openBreakpoint from './openBreakpoint'

export type TAreaBreakpoint = TBreakpoint & {
  behavior: TBreakpointBehavior,
}

type TContext = {
  areaBreakpointsList: TAreaBreakpoint[],
  prevAreaBreakpoint: ?TAreaBreakpoint,
  nextAreaBreakpoint: TAreaBreakpoint,
  includesArea: boolean,
  isLastTemplate: boolean,
}
type TAreaBreakpointPair = TContext

const when = (predicate, whenTrueFunc) => {
  return (args) => (predicate(args) ? whenTrueFunc(args) : args)
}

const updateWith = (key, updateFunc) => {
  return (args) => {
    const [first, ...rest] = args // eslint-disable-line
    return [updateFunc(args), ...rest]
  }
}

const spread = (func) => (args) => func.apply(null, args)

const createContext = (areaName: string) => {
  return (areaBreakpointsList, template, index, templates) => {
    const isLastTemplate = index === templates.length - 1
    const { areas, behavior, breakpoint } = template
    const includesArea = areas.includes(areaName)
    const prevAreaBreakpoint =
      areaBreakpointsList[areaBreakpointsList.length - 1]
    const nextAreaBreakpoint = {
      ...breakpoint,
      behavior,
    }

    console.log('-------------------')
    console.log('creating context...')
    console.log({ areaBreakpointsList })
    console.log({ template })

    const context = [
      nextAreaBreakpoint,
      prevAreaBreakpoint,
      includesArea,
      isLastTemplate,
      areaBreakpointsList,
    ]

    console.log({ context })

    return context
  }
}

const shouldMerge = ([nextAreaBreakpoint, prevAreaBreakpoint]): boolean => {
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
]: TAreaBreakpointPair) => {
  return isLastTemplate && nextAreaBreakpoint.behavior === 'up'
}

const updateBreakpointsList = ([
  nextAreaBreakpoint,
  prevAreaBreakpoint,
  includesArea,
  _isLastTemplate,
  areaBreakpointsList,
]: TAreaBreakpointPair) => {
  console.log('appending new breakpoint to the list...')
  console.log({ prevAreaBreakpoint })
  console.log({ nextAreaBreakpoint })

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

  console.log({ areaBreakpointsList })
  console.log({ shouldReplaceLast })

  const targetList = shouldReplaceLast
    ? pop(areaBreakpointsList)
    : areaBreakpointsList

  const nextAreaBreakpointsList = targetList.concat(newBreakpoint)
  console.log({ nextAreaBreakpointsList })

  return nextAreaBreakpointsList
}

const getAreaBreakpoints = (
  areaName: string,
  templates: TTemplate[],
): Array<?TAreaBreakpoint> =>
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
