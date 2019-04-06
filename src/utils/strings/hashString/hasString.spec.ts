import hashString from './hashString'

test('Returns numeric hash based on the given string', () => {
  const templateString = 'template:header,content,footer'
  expect(hashString(templateString)).toEqual(1927731245)
  expect(hashString(templateString)).toEqual(1927731245)

  expect(hashString('templateMd:header,content,footer')).toEqual(1323128868)
})

test('Returns zero for empty string', () => {
  expect(hashString('')).toEqual(0)
})
