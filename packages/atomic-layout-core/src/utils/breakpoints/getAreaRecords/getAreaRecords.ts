import { Breakpoint, BreakpointBehavior } from '../../../const/defaultOptions'
import { Template } from '../../templates/getAreasList'
import pop from '../../functions/pop'
import shouldMergeBreakpoints from '../shouldMergeBreakpoints'
import mergeAreaRecords from '../mergeAreaRecords'
import openBreakpoint from '../openBreakpoint'

export interface AreaRecord {
  breakpoint: Breakpoint
  behavior: BreakpointBehavior
}

type AreaRecordsList = Array<AreaRecord | null>

const canMergeRecords = (prevRecord: AreaRecord, nextRecord: AreaRecord) => {
  const hasSameBehavior = prevRecord.behavior === nextRecord.behavior
  const hasInclusiveBehavior =
    prevRecord.behavior === 'up' && nextRecord.behavior === 'down'
  const shouldMergeRecords = hasSameBehavior || hasInclusiveBehavior

  if (!shouldMergeRecords) {
    return false
  }

  // Check if breakpoints are compatible to be merged
  return shouldMergeBreakpoints(prevRecord.breakpoint, nextRecord.breakpoint)
}

const handleLastRecord = (
  isLastTempate: boolean,
  areaRecord: AreaRecord,
): AreaRecord => {
  return {
    behavior: areaRecord.behavior,
    breakpoint:
      isLastTempate && areaRecord.behavior === 'up'
        ? openBreakpoint(areaRecord.breakpoint)
        : areaRecord.breakpoint,
  }
}

export default function getAreaRecords(
  areaName: string,
  templates: Template[],
): AreaRecordsList {
  const templatesCount = templates.length

  return templates.reduce<AreaRecordsList>((list, template, index) => {
    const { areas, behavior, breakpoint } = template
    // Important to know if operating on the last record
    // to properly construct the trailing breakpoint.
    const isLastTempate = index === templatesCount - 1
    const includesArea = areas.includes(areaName)
    const areaRecord = {
      breakpoint,
      behavior,
    }
    const lastAreaRecord = list[list.length - 1]

    if (includesArea) {
      const shouldMergeRecords =
        lastAreaRecord && canMergeRecords(lastAreaRecord, areaRecord)

      if (shouldMergeRecords) {
        const mergedAreaRecord = mergeAreaRecords(
          areaRecord,
          lastAreaRecord,
          includesArea,
        )

        // Replace the preceding area record with the merged instance.
        return pop(list).concat(
          handleLastRecord(isLastTempate, mergedAreaRecord),
        )
      }

      // Append the new area record.
      return list.concat(handleLastRecord(isLastTempate, areaRecord))
    }

    // When the area is not present in the current template
    // check if the preceding area record exists. If so,
    // make sure to close it to prevent it from rendering on this breakpoint.
    if (lastAreaRecord) {
      /**
       * @todo Confusing that "merge" also closes the breakpoint.
       * Also it needs prev and next. Uh.
       */
      const closedLastAreaRecord = mergeAreaRecords(
        areaRecord,
        lastAreaRecord,
        includesArea,
      )

      return pop(list).concat([closedLastAreaRecord, null])
    }

    // Appending explicit "null" creates a separation between breakpoints
    // that prevents them being treated like siblings. Breakpoints separated
    // by "null" are not attempted to be merged, or analyzed together in any way.
    return list.concat(null)
  }, [])
}
