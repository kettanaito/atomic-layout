// require('matchmedia-polyfill')
const matchMediaMock = require('match-media-mock').create()

matchMediaMock.setConfig({
  type: 'screen',
  height: window.innerHeight,
  width: window.innerWidth,
})

window.matchMedia = matchMediaMock
