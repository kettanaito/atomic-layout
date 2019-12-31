import matchMediaMock from 'match-media-mock'
import { Layout, isServer } from '@atomic-layout/core'

let matchMediaOnServer: any

if (isServer()) {
  matchMediaOnServer = matchMediaMock.create()
  matchMediaOnServer.setConfig({
    type: 'screen',
    width: Number(
      Layout.breakpoints[Layout.defaultBreakpointName].maxWidth
        .toString()
        .replace('px', ''),
    ),
  })
}

export const getCompatibleMatchMedia = (mediaQuery: string) =>
  isServer() ? matchMediaOnServer(mediaQuery) : matchMedia(mediaQuery)
