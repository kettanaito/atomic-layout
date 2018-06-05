// @flow
import compose from './compose'

type TSanitizeTemplateString = (str: string) => string[]

/**
 * Returns an array of unique normalized grid areas
 * from the given template string.
 */
const sanitizeTemplateString: TSanitizeTemplateString = compose(
  (arr: any[]) => Array.from(new Set(arr)),
  (arr: any[]) => arr.filter(Boolean),
  (str: string) => str.split(' '),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
