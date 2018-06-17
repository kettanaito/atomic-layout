import { expect } from 'chai'
import Layout from '../../Layout'
import parseNumeric from './parseNumeric'

test('Parses value with default unit', () => {
  const parsed = parseNumeric(25)
  expect(parsed).to.deep.equal({
    value: 25,
    unit: 'px',
  })
})

test('Parses value with custom unit', () => {
  const parsed = parseNumeric('16vw')
  expect(parsed).to.deep.equal({
    value: 16,
    unit: 'vw',
  })
})

test('Parses value with custom default unit', () => {
  Layout.configure({
    defaultUnit: '%',
  })

  const parsed = parseNumeric(50)
  expect(parsed).to.deep.equal({
    value: 50,
    unit: '%',
  })
})
