import { AreaRecord } from '../getAreaRecords'
import { Breakpoint } from '../../../const/defaultOptions'
import transformNumeric from '../../math/transformNumeric'
import getPrefix from '../../strings/getPrefix'

/**
 * Merges two given area records.
 */
export default function mergeAreaRecords(
  nextAreaRecord: AreaRecord,
  prevAreaRecord: AreaRecord,
  includesArea: boolean,
): AreaRecord {
  const { behavior: prevRecordBehavior } = prevAreaRecord
  const { behavior: nextRecordBehavior } = nextAreaRecord

  const wentUp = prevRecordBehavior === 'up'
  const goesDown = nextRecordBehavior === 'down'
  const behavesSame = prevRecordBehavior === nextRecordBehavior
  const behavesInclusive = wentUp && goesDown
  const shouldStretch = wentUp

  const nextBehavior =
    !includesArea && shouldStretch ? 'down' : nextRecordBehavior

  const mergedBreakpoint = {
    ...prevAreaRecord.breakpoint,
    ...nextAreaRecord.breakpoint,
  }

  const nextBreakpoint = Object.keys(mergedBreakpoint).reduce<Breakpoint>(
    (acc, propName) => {
      let nextValue = mergedBreakpoint[propName]
      const prefix = getPrefix(propName)

      if (prefix === 'max') {
        if (!includesArea && shouldStretch) {
          const reversedValue =
            nextAreaRecord.breakpoint[propName.replace(/^max/, 'min')]
          nextValue = `calc(${transformNumeric(reversedValue)} - 1px)`
        }
      }

      if (prefix === 'min') {
        if (includesArea) {
          if (behavesSame || behavesInclusive) {
            nextValue = prevAreaRecord.breakpoint[propName]
          }
        } else {
          if (shouldStretch) {
            nextValue = prevAreaRecord.breakpoint[propName]
          }
        }
      }

      return {
        ...acc,
        [propName]: nextValue,
      }
    },
    {},
  )

  return {
    behavior: nextBehavior,
    breakpoint: nextBreakpoint,
  }
}
