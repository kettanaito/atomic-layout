// @flow
export default function getPrefix(string: string): ?string {
  const prompt = string.match(/^min|max/)
  return prompt && prompt[0]
}
