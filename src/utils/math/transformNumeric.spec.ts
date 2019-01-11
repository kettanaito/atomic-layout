import transformNumeric from './transformNumeric'

test('Suffixes numeric values with "rem" string', () => {
  expect(transformNumeric(5)).toEqual('5px')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).toEqual('2vh')
})

test('Returns "undefined" when no value is given', () => {
  expect(transformNumeric()).toEqual('')
})
