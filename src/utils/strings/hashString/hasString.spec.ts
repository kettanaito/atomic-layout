import hashString from './hashString'

test('Returns numeric hash based on the given string', () => {
  const str = 'template:header,content,footer'
  expect(hashString(str)).toEqual('1927731245')
  expect(hashString(str)).toEqual('1927731245')

  expect(hashString('templateMd:header,content,footer')).toEqual('1323128868')
})
