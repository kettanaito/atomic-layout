import compose from '@utils/functions/compose'

type SanitizeTemplateArea = (str: string) => string

/**
 * Trims whitespace, removes duplicate single quotes and enforces
 * that area line is wrapped in single quotes.
 */
const sanitizeTemplateArea: SanitizeTemplateArea = compose(
  (area: string) => area.replace(/^.+$/gm, (areaName) => `'${areaName}'`),
  (area: string) => area.replace(/'+/gm, ''),
  (area: string) => area.trim(),
)

export default sanitizeTemplateArea
