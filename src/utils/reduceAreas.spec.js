import { expect } from 'chai'
import defaultOptions from '../const/defaultOptions'
import compose from './compose'
import getPropByName from './getPropByName'
import sanitizeTemplates from './sanitizeTemplates'
import reduceAreas from './reduceAreas'

const getTemplates = compose(sanitizeTemplates, (props) =>
  getPropByName('template', props),
)

const displayAlways = {
  behavior: 'up',
  minWidth: undefined,
  maxWidth: undefined,
}

test('Returns proper mobile-first areas', () => {
  const areas = reduceAreas(
    getTemplates({
      template: 'first',
    }),
  )

  expect(areas)
    .to.be.an('object')
    .that.deep.equals({
      first: [displayAlways],
    })
})

test('Returns proper inclusive area', () => {
  const areas = reduceAreas(
    getTemplates({
      template: `'first'`,
      templateSm: `'first second'`,
      templateLg: `'first'`,
    }),
  )

  expect(areas)
    .to.be.an('object')
    .that.deep.equals({
      first: [displayAlways],
      second: [
        {
          behavior: 'up',
          minWidth: defaultOptions.breakpoints.sm.minWidth,
          maxWidth: defaultOptions.breakpoints.sm.maxWidth,
        },
      ],
    })
})

test('Returns proper bell area', () => {
  const areas = reduceAreas(
    getTemplates({
      template: `'first second'`,
      templateMd: `'first'`,
      templateLg: `'first second'`,
    }),
  )

  console.log(areas)

  expect(areas)
    .to.be.an('object')
    .that.deep.equals({
      first: [displayAlways],
      second: [
        {
          behavior: 'up',
          minWidth: undefined,
          maxWidth: defaultOptions.breakpoints.xs.maxWidth,
        },
        {
          behavior: 'up',
          minWidth: defaultOptions.breakpoints.lg.minWidth,
          maxWidth: undefined,
        },
      ],
    })
})
