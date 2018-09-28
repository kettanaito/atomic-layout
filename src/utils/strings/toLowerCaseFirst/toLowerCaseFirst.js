// @flow
import * as R from 'ramda'

const toLowerCaseFirst = R.compose(
  R.join(''),
  R.adjust(R.toLower, 0),
)

export default toLowerCaseFirst
