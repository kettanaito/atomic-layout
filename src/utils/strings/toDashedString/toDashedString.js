// @flow
import * as R from 'ramda'
import toLowerCaseFirst from '../toLowerCaseFirst'

const toDashedString = R.compose(
  R.replace(
    /[A-Z]/g,
    R.compose(
      R.join(''),
      R.prepend('-'),
      R.toLower,
    ),
  ),
  toLowerCaseFirst,
)

export default toDashedString
