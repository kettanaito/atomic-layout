import transformNumeric from './transformNumeric'

test('Suffixes numeric values with "rem" string', () => {
  expect(transformNumeric(5)).toEqual('5px')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).toEqual('2vh')
})

test('Returns empty string for empty string as value', () => {
  expect(transformNumeric('')).toEqual('')
})

test('Handles explicit 0 as a value', () => {
  expect(transformNumeric('0')).toEqual('0')
  expect(transformNumeric(0)).toEqual('0px')
})
