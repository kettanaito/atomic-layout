import Layout from '../../Layout'
import transformNumeric from './transformNumeric'

describe('transformNumeric', () => {
  describe('given arbitrary number rather than 0', () => {
    describe('and using default measurement unit', () => {
      it('should suffix numeric value with the measurement unit', () => {
        expect(transformNumeric(5)).toBe('5px')
      })
    })

    describe('and using custom measurement unit', () => {
      beforeAll(() => {
        Layout.configure({
          defaultUnit: 'rem',
        })
      })

      it('should suffix numeric value with the custom measurement unit', () => {
        expect(transformNumeric(3)).toBe('3rem')
      })
    })
  })

  describe('given a string', () => {
    it('should return the string as-is', () => {
      expect(transformNumeric('2vh')).toBe('2vh')
    })
  })

  describe('given a numeric 0', () => {
    it('should return explicit "0"', () => {
      expect(transformNumeric(0)).toBe('0')
    })
  })

  describe('given a string zero "0"', () => {
    it('should return the string as-is', () => {
      expect(transformNumeric('0')).toBe('0')
    })
  })

  describe('given no input', () => {
    it('should return an empty string', () => {
      expect(transformNumeric()).toBe('')
      expect(transformNumeric('')).toBe('')
    })
  })
})
