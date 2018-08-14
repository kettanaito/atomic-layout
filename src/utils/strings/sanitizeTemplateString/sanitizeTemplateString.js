// @flow
import compose from '../../functions/compose'

const dedupeList = (list: string[]): string[] => {
  return Array.from(new Set(list))
}

type SanitizeTemplateString = (str: string) => string[]

/**
 * Returns an array of unique normalized grid areas
 * from the given template string.
 */
const sanitizeTemplateString: SanitizeTemplateString = compose(
  dedupeList,
  (arr: any[]) => arr.filter(Boolean),
  (str: string) => str.split(' '),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
