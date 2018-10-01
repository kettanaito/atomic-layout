// @flow
import * as R from 'ramda'

type SanitizeTemplateString = (str: string) => string[]

/**
 * Returns an array of unique normalized grid areas
 * from the given template string.
 */
const sanitizeTemplateString: SanitizeTemplateString = R.compose(
  R.uniq,
  R.filter(Boolean),
  R.split(' '),
  R.trim,
  R.replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
