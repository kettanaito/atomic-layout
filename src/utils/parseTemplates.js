import compose from './compose'
import sanitizeTemplates from './sanitizeTemplates'
import generateComponents from './generateComponents'
import reduceAreas from './reduceAreas'

const parseTemplates = compose(
  generateComponents,
  reduceAreas,
  sanitizeTemplates,
)

export default parseTemplates
