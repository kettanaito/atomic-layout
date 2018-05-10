import React from 'react'
import { expect } from 'chai'
import parseTemplate from './parseTemplate'

test('returns proper components based on template string', () => {
  const template = 'header content footer'
  const parsed = parseTemplate(template)

  expect(parsed)
    .to.be.an.instanceOf(Object)
    .that.has.all.keys(['Header', 'Content', 'Footer'])
})
