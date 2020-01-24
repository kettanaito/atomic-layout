[![Package version](https://img.shields.io/npm/v/@atomic-layout/emotion.svg)][npm-url]
[![Package size](https://img.shields.io/bundlephobia/minzip/@atomic-layout/emotion.svg)][bundlephobia-url]
[![Build status](https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg)][build-url]
[![Test coverage](https://coveralls.io/repos/github/kettanaito/atomic-layout/badge.svg)][test-coverage-url]
[![Dependencies status](https://img.shields.io/david/kettanaito/atomic-layout.svg)][dependencies-url]

[![Discord channel](https://img.shields.io/discord/102860784329052160.svg?label=Chat&logo=discord&style=flat)][community-reactiflux]
[![Spectrum channel](https://withspectrum.github.io/badge/badge.svg)][community-spectrum]

<br/>

<p align="center">
  <img src="https://raw.githubusercontent.com/kettanaito/atomic-layout/d10ba4587cf70cfacba05d8d71055520ff904d39/logo.svg?sanitize=true" width="200" alt="Atomic Layout logo" />
</p>

<h1 align="center">Atomic Layout (emotion)</h1>

**Atomic Layout** is a spatial distribution library for React. It uses [CSS Grid][css-grid] to define layout areas and render them as React components. This pattern encourages separation of elements and spacing, preventing contextual implementations and boosting maintenance of layouts.

```jsx
import React from 'react'
import { Composition } from 'atomic-layout'

// Define layout areas: visual representation
// of what composes a layout, detached from
// what components are actually rendered.
const areasMobile = `
  thumbnail
  header
  footer
`

// Declare responsive changes of your areas.
// Operate in two dimensions, remove areas
// or introduce new ones.
const areasTablet = `
  thumbnail header
  thumbnail footer
`

const Card = ({ title, imageUrl, actions }) => (
  <Composition areas={areasMobile} areasMd={areasTablet} gap={20}>
    {/* Get React components based on provided areas */}
    {({ Thumbnail, Header, Footer }) => (
      <React.Fragment>
        <Thumbnail>
          {/* Render anything, including another Composition */}
          <img src={imageUrl} alt={title} />
        </Thumbnail>
        {/* Preserve semantics with polymorphic prop */}
        <Header as="h3">{title}</Header>
        {/* Responsive props: just suffix with a breakpoint name */}
        <Footer padding={10} paddingMd={20}>
          {actions}
        </Footer>
      </React.Fragment>
    )}
  </Composition>
)

export default Card
```

> Atomic Layout comes with built-in responsive support. It uses [Bootstrap 4 breakpoints][bootstrap-4-breakpoints] by default, which you can always [override with the custom breakpoints](https://redd.gitbook.io/atomic-layout/api/layout/configure#breakpoints) to match your requirements.

## Install

```bash
npm install @atomic-layout/emotion @emotion/core @emotion/styled
```

> If you are looking for `styled-components` support see the [`atomic-layout`](https://github.com/kettanaito/atomic-layout) library.

## Documentation

> **See the [Official documentation][atomic-layout-docs].**

There are some shortcuts to get you started:

- [Motivation](https://redd.gitbook.io/atomic-layout/motivation)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Recipes](https://redd.gitbook.io/atomic-layout/recipes/semantics)

## Contributing

Thank you for deciding to contribute! Your involvement makes a significant impact on the library and its future.

**Please read the [Contribution guidelines](https://github.com/kettanaito/atomic-layout/blob/master/.github/CONTRIBUTING.md)** to get familiar with the contributing process. The issues labeled [`help wanted`](https://github.com/kettanaito/atomic-layout/labels/help%20wanted) or [`good first issue`](https://github.com/kettanaito/atomic-layout/labels/good%20first%20issue) are a good place to start cooperating on Atomic Layout. Feature suggestions or bug reports, discussion, and pull requests are always welcome!

[npm-url]: https://npmjs.com/package/@atomic-layout/emotion
[bundlephobia-url]: https://bundlephobia.com/result?p=@atomic-layout/emotion
[build-url]: https://circleci.com/gh/kettanaito/atomic-layout
[test-coverage-url]: https://coveralls.io/github/kettanaito/atomic-layout
[dependencies-url]: https://david-dm.org/kettanaito/atomic-layout
[community-spectrum]: https://spectrum.chat/atomic-layout
[community-reactiflux]: https://discordapp.com/channels/102860784329052160/543033450924474378
[bootstrap-4-breakpoints]: https://getbootstrap.com/docs/4.0/layout/grid/#grid-options
[css-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[atomic-layout-docs]: https://redd.gitbook.io/atomic-layout
