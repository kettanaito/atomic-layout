// @flow
import * as R from 'ramda'
import Layout from '../../../Layout'
import parsePropName from '../../strings/parsePropName'

/**
 * Returns the derived props that contain only template
 * declarations.
 */
const filterTemplateProps = R.pickBy(
  R.compose(
    R.propEq('purePropName', 'template'),
    parsePropName(Layout),
    R.nthArg(1),
  ),
)

export default filterTemplateProps
