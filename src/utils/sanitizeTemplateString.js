import compose from 'ramda/src/compose'
import uniq from 'ramda/src/uniq'
import filter from 'ramda/src/filter'
import split from 'ramda/src/split'
import trim from 'ramda/src/trim'
import replace from 'ramda/src/replace'

/**
 * Takes a template string and returns an array of normalized
 * and unique grid areas based on that string.
 */
const sanitizeTemplateString = compose(
  uniq,
  filter(Boolean),
  split(' '),
  trim,
  replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
