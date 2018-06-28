// @flow

export default function pick (obj: Object, picks: string []): Object {
  const picked = {}

  picks.forEach(pick => {
    if (obj[pick] !== undefined) {
      picked[pick] = (obj)[pick]
    }
  })

  return picked
}
