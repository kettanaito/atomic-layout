import compose from '@utils/functions/compose'
import isAreaName from '../isAreaName'

type SanitizeTemplateString = (str: string) => string[]

// Returns an array of unique normalized grid areas
// from the given template string.
const sanitizeTemplateString: SanitizeTemplateString = compose(
  (list: string[]): string[] => list.sort(),

  // Deduplicate area strings
  (list: string[]): string[] => Array.from(new Set(list)),

  // Filter out "template" row/columns sizes
  (arr: string[]): string[] => arr.filter(isAreaName),

  // Filter out empty area strings
  (arr: string[]): string[] => arr.filter(Boolean),

  // Split into a list of areas
  (str: string): string[] => str.split(' '),

  // Deduplicate multiple spaces
  (str: string): string => str.replace(/\s+/g, ' '),

  // Replace new lines and single quotes with spaces
  (str: string): string => str.replace(/\r?\n|\'+/g, ' '),
)

export default sanitizeTemplateString
