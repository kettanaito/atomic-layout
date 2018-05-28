import compose from './compose'

/**
 * Takes a template string and returns an array of normalized
 * and unique grid areas based on that string.
 */
const sanitizeTemplateString = compose(
  (arr) => Array.from(new Set(arr)),
  (arr) => arr.filter(Boolean),
  (str) => str.split(' '),
  (str) => str.trim(),
  (str) => str.replace(/\r?\n|\r|\'/g, ''),
)

export default sanitizeTemplateString
