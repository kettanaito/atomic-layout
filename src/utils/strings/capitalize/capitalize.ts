export default function capitalize(str: string): string {
  return str.replace(/^./, (firstLetter) => firstLetter.toUpperCase())
}
