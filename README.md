![npm](https://img.shields.io/npm/v/atomic-layout.svg) ![](https://img.shields.io/bundlephobia/minzip/atomic-layout.svg)

# atomic-layout

Atomic layout is an implementational paradigm that delegates distribution of spacial relation between composites to the dedicated layer.

This library is a representative of that paradigm. **It's a single React component to declare spacial relation between any composites**. Inspired by and encourages [Atomic design](http://bradfrost.com/blog/post/atomic-web-design).

## Why?

Now, when you compose molecules out of atoms you add spacial properties to the atoms directly. Not only that makes you write more CSS, that contradicts the core principle of an atom being simple, reusable, predictable.

Atomic layout introduces a higher layer that distributes spacial relation between **any** composites (atoms, molecules, organisms) without mutating their behavior.

## How does it work?

It's a flexible abstraction above [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) written in [React](https://reactjs.org/), powered by [styled-components](https://github.com/styled-components/styled-components).

You're probably thinking it's some sort of experimental hack. Well, in fact Atomic layout is built on technologies which have been around _for years_. It's stable, it's standardized, it's production-ready.

## Getting started

```jsx
import React from 'react'
import { Layout } from 'atomic-layout'

// declare template areas
const templateMobile = `
  'thumbnail'
  'heading'
  'subheading'
`

// don't forget about responsive
const templateDesktop = `
  'thumbnail heading'
  'thumbnail subheading'
`

const Card = () => (
  <Layout template={templateMobile} templateSm={templateDesktop}>
    {/* Get React components based on your grid areas */}
    {({ Thumbnail, Heading, Subheading }) => (
      <React.Fragment>
        <Thumbnail>
          <img src="foo.png" />
        </Thumbnail>
        <Heading>
          <h4>Juicy fruits</h4>
        </Heading>
        <Subheading>
          <p>Healthy mind in a healthy body.</p>
        </Subheading>
      </React.Fragment>
    )}
  </Layout>
)

export default Card
```

## API

Please see the [Official documentation](https://redd.gitbook.io/atomic-layout/).

## Support

See the [Support table](https://caniuse.com/#feat=css-grid).
