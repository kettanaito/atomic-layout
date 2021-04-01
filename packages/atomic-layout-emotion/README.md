<p align="center">
  <img src="https://raw.githubusercontent.com/kettanaito/atomic-layout/master/packages/atomic-layout-emotion/logo-full.png" width="400" alt="Atomic Layout logo" />
</p>

<div align="center">

[![Package version](https://img.shields.io/npm/v/@atomic-layout/emotion.svg?color=%237B85FF)][npm-url]
[![Package size](https://img.shields.io/bundlephobia/minzip/@atomic-layout/emotion.svg?color=%237B85FF)][bundlephobia-url]
[![Build status](https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg)][build-url]
[![Dependencies status](https://img.shields.io/david/kettanaito/atomic-layout.svg?color=%237B85FF)][dependencies-url]

[![Discord channel](https://img.shields.io/discord/102860784329052160.svg?label=Chat&logo=discord&style=flat&color=%237B85FF)][community-reactiflux]

</div>

<br/>

**Atomic Layout** is a spatial distribution library for React. It uses [CSS Grid][css-grid] to define layout areas and render them as React components. This pattern encourages separation of elements and spacing, preventing contextual implementations and boosting maintenance of layouts.

```jsx
import React from 'react'
import { Composition } from '@atomic-layout/emotion'

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

## Install

```bash
npm install @atomic-layout/emotion @emotion/core @emotion/styled
```

> Using something else than `emotion`? See the full list of [Atomic Layout implementations](../../README.md#implementations).

## Documentation

> **See the [Official documentation][atomic-layout-docs].**

There are some shortcuts to get you started:

- [Motivation](https://redd.gitbook.io/atomic-layout/motivation)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Recipes](https://redd.gitbook.io/atomic-layout/recipes/semantics)

[npm-url]: https://npmjs.com/package/@atomic-layout/emotion
[bundlephobia-url]: https://bundlephobia.com/result?p=@atomic-layout/emotion
[build-url]: https://circleci.com/gh/kettanaito/atomic-layout
[dependencies-url]: https://david-dm.org/kettanaito/atomic-layout
[community-reactiflux]: https://discordapp.com/channels/102860784329052160/543033450924474378
[css-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[atomic-layout-docs]: https://redd.gitbook.io/atomic-layout
