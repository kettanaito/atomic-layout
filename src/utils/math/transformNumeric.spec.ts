import transformNumeric from './transformNumeric'

test('Suffixes numeric values with "px" string', () => {
  expect(transformNumeric(5)).toEqual('5px')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).toEqual('2vh')
})

test('Returns "undefined" when no value is given', () => {
  expect(transformNumeric()).toEqual('')
})

test('Suffixes numeric values with "px" string, if value is zero the result should be 0px', () => {
  expect(transformNumeric(0)).toEqual('0px')
})
