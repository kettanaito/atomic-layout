export default function getPrefix(str: string): string {
  const prompt = str.match(/^(min|max)/)
  return prompt ? prompt[0] : ''
}
