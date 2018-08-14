import sanitizeTemplateArea from './sanitizeTemplateArea'

test('Enforces single quotes for new lines', () => {
  const sanitized = sanitizeTemplateArea('foo')
  expect(sanitized).toEqual("'foo'")

  const multilineSanitized = sanitizeTemplateArea('foo bar')
  expect(multilineSanitized).toEqual("'foo bar'")
})

test('Removes duplicate single quotes', () => {
  const sanitized = sanitizeTemplateArea("'foo'")
  expect(sanitized).toEqual("'foo'")

  const multilineSanitized = sanitizeTemplateArea("'foo bar'")
  expect(multilineSanitized).toEqual("'foo bar'")
})
