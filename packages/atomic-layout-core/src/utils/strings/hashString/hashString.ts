export default function hashString(str: string): number {
  const { length } = str
  let hash = 0
  let i = 0

  if (length > 0) {
    while (i < length) {
      hash = ((hash << 5) - hash + str.charCodeAt(i++)) | 0
    }
  }

  return hash
}
