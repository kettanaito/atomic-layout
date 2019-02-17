import compose from '@utils/functions/compose'

type SanitizeTemplateString = (str: string) => string[]

/**
 * Returns an array of unique normalized grid areas
 * from the given template string.
 */
const sanitizeTemplateString: SanitizeTemplateString = compose(
  (list: string[]): string[] => list.sort(),

  /* Deduplicates area strings */
  (list: string[]): string[] => Array.from(new Set(list)),

  /* Filters out empty area strings */
  (arr: any[]) => arr.filter(Boolean),

  /* Splits into a list of areas */
  (str: string) => str.split(' '),

  /* Deduplicates multiple spaces */
  (str: string) => str.replace(/\s+/g, ' '),

  /* Replaces newlines and single quotes with spaces */
  (str: string) => str.replace(/\r?\n|\'+/g, ' '),
)

export default sanitizeTemplateString
