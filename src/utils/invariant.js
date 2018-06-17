// @flow
type TPreciate = () => boolean

export default function invariant(predicate: TPreciate, message: string) {
  if (!predicate) {
    console.error(message)
  }
}
