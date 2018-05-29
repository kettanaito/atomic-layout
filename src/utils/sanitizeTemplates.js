import sanitizeTemplateString from './sanitizeTemplateString'

export default function sanitizeTemplates(templates) {
  return templates.map(({ behavior, mediaQuery, propValue }) => ({
    behavior,
    mediaQuery,
    areas: sanitizeTemplateString(propValue),
  }))
}
