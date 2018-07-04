import transformNumeric from './transformNumeric'

test('Suffixes numeric values with "rem" string', () => {
  expect(transformNumeric(5)).toEqual('5rem')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).toEqual('2vh')
})
