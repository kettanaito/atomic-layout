import warn from './warn'

describe('warn', () => {
  describe('warns when not satisfied predicate', () => {
    const values = [
      ['0', 0],
      ['false', false],
      ['null', null],
      ['undefined', undefined],
    ]

    values.forEach(([name, value]) => {
      it(`when given ${name}`, () => {
        const consoleSpy = jest.spyOn(console, 'warn')
        const message = 'Warning message'

        warn(value, message)
        expect(consoleSpy).toBeCalledTimes(1)
        expect(consoleSpy).toBeCalledWith(message)

        consoleSpy.mockRestore()
      })
    })
  })

  describe('does nothing when satisfies predicate', () => {
    const values = [
      ['one', 1],
      ['true', true],
      ['object', {}],
      ['array', [] as any[]],
    ]

    values.forEach(([name, value]) => {
      it(`when given ${name}`, () => {
        const consoleSpy = jest.spyOn(console, 'warn')

        warn(value, 'Foo')
        expect(consoleSpy).not.toBeCalled()

        consoleSpy.mockRestore()
      })
    })
  })
})
