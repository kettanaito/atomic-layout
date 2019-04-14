import Layout from '../../Layout'
import transformNumeric from './transformNumeric'

describe('transformNumeric', () => {
  describe('suffixes numeric value with measurement unit', () => {
    it('with default measurement unit', () => {
      expect(transformNumeric(5)).toBe('5px')
    })

    it('with custom measurement unit', () => {
      Layout.configure({
        defaultUnit: 'rem',
      })

      expect(transformNumeric(3)).toBe('3rem')
    })
  })

  it('bypasses string value', () => {
    expect(transformNumeric('2vh')).toBe('2vh')
  })

  it('handles explicit zero as a value and no suffix is attached', () => {
    expect(transformNumeric('0')).toBe('0')
    expect(transformNumeric(0)).toBe('0')
  })

  it('returns empty string when no value provided', () => {
    expect(transformNumeric()).toBe('')
    expect(transformNumeric('')).toBe('')
  })
})
