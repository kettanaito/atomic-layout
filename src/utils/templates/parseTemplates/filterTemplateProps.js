// @flow
import Layout from '../../../Layout'
import capitalize from '../../strings/capitalize'
import pick from '../../functions/pick'

/**
 * Filters properties of the given object to contain only those
 * that are template declarations (match regular expression below).
 */
const filterTemplateProps = pick([
  new RegExp(
    `^template(${Layout.getBreakpointsNames()
      .map(capitalize)
      .join('|')})*$`,
  ),
])

export default filterTemplateProps
