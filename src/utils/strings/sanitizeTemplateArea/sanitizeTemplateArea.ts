import compose from '@utils/functions/compose'
import isAreaName from '../isAreaName'

type SanitizeTemplateArea = (str: string) => string

// Joins a given template string fragments into a valid template string.
// Takes into account proper single quote wrapping around the areas
// and no single quotes around the dimensions (row/columns).
const joinTemplateFragments = (fragments: string[]): string => {
  const areas = []
  const suffixes = []

  fragments.forEach((areaName) => {
    if (isAreaName(areaName)) {
      areas.push(areaName)
    } else {
      suffixes.push(areaName)
    }
  })

  const joinedAreas = areas.length > 0 ? `'${areas.join(' ')}'` : ''
  const joinedSuffixes = suffixes.join(' ')

  return [joinedAreas, joinedSuffixes].filter(Boolean).join(' ')
}

// Prepares given "grid-template-areas" string to be digestible.
// Trims whitespace, deduplicates single quotes and wraps
// each line in single quotes.
const sanitizeTemplateArea: SanitizeTemplateArea = compose(
  joinTemplateFragments,
  (area: string): string[] => area.split(' '),
  (area: string): string => area.replace(/'+/gm, ''),
  (area: string): string => area.trim(),
)

export default sanitizeTemplateArea
