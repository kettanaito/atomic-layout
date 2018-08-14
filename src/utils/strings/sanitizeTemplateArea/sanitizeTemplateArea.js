// @flow
import compose from '../../functions/compose'

/**
 * Trims whitespace, removes duplicate single quotes and enforces
 * that area line is wrapped in single quotes.
 */
const sanitizeTemplateArea = compose(
  (area: string) => area.replace(/^.+$/gm, (areaName) => `'${areaName}'`),
  (area: string) => area.replace(/'+/gm, ''),
  (area: string) => area.trim(),
)

export default sanitizeTemplateArea
