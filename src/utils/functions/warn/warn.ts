export default function warn(predicate: any, message: string) {
  if (!predicate) {
    console.warn(message)
  }
}
