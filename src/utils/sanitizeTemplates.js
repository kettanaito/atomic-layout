// @flow
import type { TProp } from './getPropByName'
import type { TGridTemplate } from './parseTemplates'
import sanitizeTemplateString from './sanitizeTemplateString'

export default function sanitizeTemplates(
  templates: TProp<string>[],
): TGridTemplate[] {
  return templates.map((params) =>
    Object.assign({}, params, {
      areas: sanitizeTemplateString(params.propValue),
    }),
  )
}
