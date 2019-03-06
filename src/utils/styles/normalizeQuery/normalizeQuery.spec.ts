import normalizeQuery from './normalizeQuery'

test('Returns query params list from a given media query Object', () => {
  const res = normalizeQuery({ minWidth: 120, maxAspectRatio: '3/4' })
  expect(res).toEqual([['min-width', 120], ['max-aspect-ratio', '3/4']])
})
