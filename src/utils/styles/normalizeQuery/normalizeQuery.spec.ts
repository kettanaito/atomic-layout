import normalizeQuery from './normalizeQuery'

describe('normalizeQuery', () => {
  it('returns [key, value] pairs of a given media query Object', () => {
    expect(
      normalizeQuery({
        minWidth: 120,
        maxAspectRatio: '3/4',
      }),
    ).toEqual([['min-width', 120], ['max-aspect-ratio', '3/4']])
  })
})
