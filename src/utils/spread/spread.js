// @flow
import type { TFunc } from '../compose'

export default function spread(func: TFunc) {
  return (args: mixed) => func.apply(null, args)
}
