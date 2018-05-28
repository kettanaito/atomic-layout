import { expect } from 'chai'
import resolutions, { getResolutionNames } from '../../const/resolutions'
import getResponsiveGroups from './getResponsiveGroups'

// const resolutions = [
//   { name: 'xs', to: 469 },
//   { name: 'sm', from: 470, to: 759 },
//   { name: 'md', from: 760, to: 959 },
//   { name: 'lg', from: 960 },
// ]

test('Returns proper split groups', () => {
  expect(getResponsiveGroups({ resolutions: ['xs', 'sm', 'lg'] }, resolutions))
    .to.be.an('array')
    .with.lengthOf(2)
    .that.deep.equals([{ from: undefined, to: 768 }, { from: 993, to: 1199 }])
})

test('Returns proper inclusive groups', () => {
  expect(getResponsiveGroups({ resolutions: ['sm', 'md', 'lg'] }, resolutions))
    .to.be.an('array')
    .with.lengthOf(1)
    .that.deep.equals([{ from: 576, to: 1199 }])
})

test('Returns "undefined" for component on all resolutions', () => {
  expect(
    getResponsiveGroups({ resolutions: getResolutionNames() }, resolutions),
  )
    .to.be.an('array')
    .with.lengthOf(1)
    .that.deep.equals([{ from: undefined, to: undefined }])
})
