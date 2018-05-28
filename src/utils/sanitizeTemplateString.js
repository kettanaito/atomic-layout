import * as R from 'ramda'

/**
 * Takes a template string and returns an array of normalized
 * and unique grid areas based on that string.
 */
const sanitizeTemplateString = R.compose(
  R.uniq,
  R.filter(Boolean),
  R.split(' '),
  R.trim,
  R.replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
