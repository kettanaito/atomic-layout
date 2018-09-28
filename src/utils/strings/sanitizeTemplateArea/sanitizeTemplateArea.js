// @flow
import * as R from 'ramda'

/**
 * Trims whitespace, removes duplicate single quotes and enforces
 * that area line is wrapped in single quotes.
 */
const sanitizeTemplateArea = R.compose(
  R.replace(/^.+$/gm, (areaName) => `'${areaName}'`),
  R.replace(/'+/gm, ''),
  R.trim,
)

export default sanitizeTemplateArea
