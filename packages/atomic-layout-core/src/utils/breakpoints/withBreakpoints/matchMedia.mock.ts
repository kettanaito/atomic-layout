/* tslint:disable-rule no-implicit-dependencies */
import matchMediaMock from 'match-media-mock'

const mock = matchMediaMock.create()

mock.setConfig({
  type: 'screen',
  height: window.innerHeight,
  width: window.innerWidth,
})

window.matchMedia = mock
