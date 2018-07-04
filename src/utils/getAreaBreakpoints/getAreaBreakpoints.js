// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
import type { TTemplate } from '../getAreasList'
import pop from '../pop'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'
import mergeBreakpoints from '../mergeBreakpoints'
import closeBreakpoint from './closeBreakpoint'

export type TAreaBreakpoint = TBreakpoint & {
  behavior: TBreakpointBehavior,
}

/**
 * Returns area params for the given area name in the templates definitions provided.
 * Performs smart breakpoint concatenation and merging when necessary.
 * Returned area params are used as media query params passed to <MediaQuery/>.
 */
export default function getAreaBreakpoints(
  areaName: string,
  templates: TTemplate[],
): ?(TAreaBreakpoint[]) {
  return templates.reduce((areasParamsList, template, index) => {
    const {
      areas,
      breakpoint: nextBreakpoint,
      behavior: nextBehavior,
    } = template
    const isLastTemplate = index === templates.length - 1
    const includesArea = areas.includes(areaName)
    const lastAreaBreakpoint = areasParamsList[areasParamsList.length - 1]

    const nextAreaBreakpoint = {
      behavior: nextBehavior,
      ...nextBreakpoint,
    }

    const { behavior: lastBehavior, ...lastBreakpoint } =
      lastAreaBreakpoint || {}

    const wentUp = lastBehavior === 'up'
    const goesDown = nextBehavior === 'down'
    const goesUp = nextBehavior === 'up'

    /* Behaviors */
    const behavesSame = lastBehavior === nextBehavior
    const behavesInclusive = wentUp && goesDown

    let shouldReplaceLast = includesArea && (behavesSame || behavesInclusive)
    const shouldStretch = wentUp

    let mergedBreakpoint =
      lastAreaBreakpoint &&
      shouldMergeBreakpoints(lastBreakpoint, nextBreakpoint)
        ? mergeBreakpoints(
            lastAreaBreakpoint,
            nextAreaBreakpoint,
            includesArea,
            isLastTemplate,
          )
        : nextAreaBreakpoint

    if (isLastTemplate && mergedBreakpoint.behavior === 'up') {
      console.log('is last tempalte', isLastTemplate)
      console.log('goes up', goesUp)
      mergedBreakpoint = closeBreakpoint(mergedBreakpoint)
    }

    if (!includesArea) {
      mergedBreakpoint = shouldStretch ? [mergedBreakpoint, null] : null

      if (shouldStretch) {
        shouldReplaceLast = true
      }
    }

    console.log({ lastAreaBreakpoint })
    console.log({ shouldReplaceLast })
    console.log({ mergedBreakpoint })
    console.log('------------------------------')

    const targetList = shouldReplaceLast
      ? pop(areasParamsList)
      : areasParamsList
    return targetList.concat(mergedBreakpoint)
  }, [])
}
