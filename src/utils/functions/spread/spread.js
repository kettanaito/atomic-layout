// @flow
import type { Func } from '../compose'

export default function spread(func: Func) {
  return (args: mixed) => func.apply(null, args)
}
