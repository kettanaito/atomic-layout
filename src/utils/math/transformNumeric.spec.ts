import transformNumeric from './transformNumeric'

test('Returns empty string when no value provided', () => {
  expect(transformNumeric()).toEqual('')
  expect(transformNumeric('')).toEqual('')
})

test('Suffixes numeric values with "px" string', () => {
  expect(transformNumeric(5)).toEqual('5px')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).toEqual('2vh')
})

test('Handles explicit 0 as a value and no suffix is attached', () => {
  expect(transformNumeric('0')).toEqual('0')
  expect(transformNumeric(0)).toEqual('0')
})
