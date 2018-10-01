// @flow
import * as R from 'ramda'

const toDashedString = R.compose(
  R.join('-'),
  R.map(R.toLower),
  R.split(/(?=[A-Z])/g),
)

export default toDashedString
