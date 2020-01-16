import compose from '../../functions/compose'
import isAreaName from '../isAreaName'

type SanitizeTemplateArea = (str: string) => string

/**
 * Joins a given template string fragments into a valid template string.
 * Appends any row/column dimensions after the enclosing single quote
 * character to have a valid `grid-template` syntax.
 */
const joinTemplateFragments = (fragments: string[]): string => {
  const areas: string[] = []
  const suffixes: string[] = []

  fragments.forEach((areaName) => {
    if (isAreaName(areaName) || /\.+/.test(areaName)) {
      areas.push(areaName)
    } else {
      suffixes.push(areaName)
    }
  })

  // Wraps areas string in single quote per CSS spec
  const joinedAreas = areas.length > 0 ? `'${areas.join(' ')}'` : ''
  const joinedSuffixes = suffixes.join(' ')

  // Ensures row/column dimensions follow areas list after its been
  // wrapped in single quotes.
  return [joinedAreas, joinedSuffixes].filter(Boolean).join(' ')
}

/**
 * Sanitizes a given `grid-template-areas` string.
 * Trims whitespaces, deduplicates quotes and wraps each line
 * in single quotes to be CSS-compliant.
 */
const sanitizeTemplateArea: SanitizeTemplateArea = compose(
  joinTemplateFragments,
  (area: string): string[] => area.split(' '),
  (area: string): string => area.replace(/'+/gm, ''),
  (area: string): string => area.trim(),
)

export default sanitizeTemplateArea
