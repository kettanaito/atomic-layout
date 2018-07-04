import Layout from '../../Layout'
import parseNumeric from './parseNumeric'

test('Parses value with default unit', () => {
  const parsed = parseNumeric(25)
  expect(parsed).toEqual({
    value: 25,
    unit: 'px',
  })
})

test('Parses value with custom unit', () => {
  const parsed = parseNumeric('16vw')
  expect(parsed).toEqual({
    value: 16,
    unit: 'vw',
  })
})

test('Parses value with custom default unit', () => {
  Layout.configure({
    defaultUnit: '%',
  })

  const parsed = parseNumeric(50)
  expect(parsed).toEqual({
    value: 50,
    unit: '%',
  })
})
