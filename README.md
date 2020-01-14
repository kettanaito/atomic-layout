[![Package version](https://img.shields.io/npm/v/atomic-layout.svg)][npm-url]
[![Package size](https://img.shields.io/bundlephobia/minzip/atomic-layout.svg)][bundlephobia-url]
[![Build status](https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg)][build-url]
[![Test coverage](https://coveralls.io/repos/github/kettanaito/atomic-layout/badge.svg)][test-coverage-url]
[![Dependencies status](https://img.shields.io/david/kettanaito/atomic-layout.svg)][dependencies-url]

[![Discord channel](https://img.shields.io/discord/102860784329052160.svg?label=Chat&logo=discord&style=flat)][community-reactiflux]
[![Spectrum channel](https://withspectrum.github.io/badge/badge.svg)][community-spectrum]

<br/>

<p align="center">
  <img src="./logo.svg" width="200" alt="Atomic Layout" />
</p>

<h1 align="center">Atomic Layout</h1>

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

## Motivation

Modern layout development is about modularity and composition. Following the best practices of [Atomic design][atomic-design], we strive toward independent UI units that gradually compose into more meaningful pieces. While the attention paid to units implementation is thorough, we often overlook how to achieve layout composition that scales. It's as if we forget that _spacing defines composition_.

When it comes to distributing the spacing things get more difficult. First of all, true contextless spacing is hard. To make things worse, all present solutions couple spacing with UI elements, inevitably making small resusable pieces **contextful** and, thus, hard to maintain.

Atomic Layout helps you to compose your elements by introducing a dedicated spacing layer called _Composition_. It encourages you to separate concerns between UI elements' visual appearance and spacing between them. With the first-class responsive support at your disposal you can build gorgeous responsive permutations of your elements without leaving the dedicated spacing layer, keeping UI elements contextless and predictable. Embrace the era of a true layout composition!

## Install

```bash
npm install atomic-layout
```

> Make sure to have [React][react] (16.0+) and [styled-components][styled-components] (4.0+) installed.

## Documentation

> **See the [Official documentation][atomic-layout-docs].**

There are some shortcuts to get you started:

- [Motivation](https://redd.gitbook.io/atomic-layout/motivation)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Recipes](https://redd.gitbook.io/atomic-layout/recipes/semantics)

## Examples

### Basics

<table border="0">
  <tr>
    <td width="33%" valign="top">
      <a href="https://codesandbox.io/s/basic-composition-5mvlr" target="_blank">
        <img src="materials/example-thumbnails/basic-composition.jpg" alt="Basic composition: square and circle" />
        <h4>Basic composition</h4>
      </a>
      <p>Combine two UI elements into a single one using Composition.</p>
    </td>
    <td width="33%" valign="top">
      <a href="https://codesandbox.io/s/responsive-props-8m14f" target="_blank">
        <img src="materials/example-thumbnails/responsive-props.jpg" alt="Component with responsive props" />
        <h4>Responsive props</h4>
      </a>
      <p>Learn how to change a prop's value depending on a breakpoint.</p>
    </td>
    <td width="33%" valign="top">
      <a href="https://codesandbox.io/s/nested-composition-8p8pk" target="_blank">
        <img src="materials/example-thumbnails/nested-composition.jpg" alt="Composition of other compositions" />
        <h4>Nested composition</h4>
      </a>
      <p>Any element can be a composition <i>and</i> a composite at the same time.</p>
    </td>
  </tr>
</table>

## Materials

<table border="0">
  <tr>
    <td>
      <a href="https://www.youtube.com/watch?v=_HrXUB97xQs">
        <img width="500" src="./materials/react-finland-thumbnail.jpg" alt="Artem speaking at React Finland" />
      </a>
    </td>
    <td>
      <h3><a href="https://www.youtube.com/watch?v=_HrXUB97xQs">Creating layouts that last (React Finland, 2019)</a></h3>
      <p>Find out the main aspects of a layout's maintainability and why spacing plays a crucial role in it. Learn how to wield layout composition as an actual React component–a missing glue for your elements and design systems.</p>
      <ul>
        <li><a href="https://codesandbox.io/s/5wwp76310n"><strong>Live demo</strong></a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <img width="500" src="https://pbs.twimg.com/profile_images/699140827218649088/mooXwM62_400x400.png" alt="SurviveJS logo" />
    </td>
    <td>
      <h3><a href="https://survivejs.com/blog/atomic-layout-interview/">Layout composition as a React component (SurviveJS)</a></h3>
      <p>Read through the extensive interview about how Atomic layout came to be, how it's different from other solutions, and which practices it encourages.</p>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://www.youtube.com/watch?v=x_93DjN_bUA">
        <img width="500" src="./materials/react-vienna-thumbnail.jpg" alt="The Future of Layouts — Artem Zakharchenko" />
      </a>
    </td>
    <td>
      <h3><a href="https://www.youtube.com/watch?v=x_93DjN_bUA">The Future of Layouts (React Vienna, 2018)</a></h3>
      <p>Watch Artem discussing the biggest obstacle to achieve maintainable layouts, and showcases a way to combine existing technologies to build clean UI implementations using Atomic layout.</p>
      <ul>
        <li><a href="https://codesandbox.io/s/8z6xnmnnnj"><strong>Live demo</strong></a></li>
        <li><a href="http://future-of-layouts.surge.sh">Slides</a></li>
      </ul>
    </td>
  </tr>
</table>

## Community

- [Spectrum][community-spectrum]
- [Reactiflux][community-reactiflux]

## Browser support

Atomic Layout's browser support is made by the browser support of underlying technologies the library uses. Pay attention if your project can support CSS Grid to be sure you can use Atomic Layout.

> **See the [Support table for CSS Grid][css-grid-support]**. For Internet Explorer support please read [this issue](https://github.com/kettanaito/atomic-layout/issues/92).

## Contributing

Thank you for deciding to contribute! Your involvement makes a significant impact on the library and its future.

**Please read the [Contribution guidelines](./.github/CONTRIBUTING.md)** to get familiar with the contributing process. The issues labeled [`help wanted`](https://github.com/kettanaito/atomic-layout/labels/help%20wanted) or [`good first issue`](https://github.com/kettanaito/atomic-layout/labels/good%20first%20issue) are a good place to start cooperating on Atomic Layout. Feature suggestions or bug reports, discussion, and pull requests are always welcome!

[npm-url]: https://npmjs.com/package/atomic-layout
[bundlephobia-url]: https://bundlephobia.com/result?p=atomic-layout
[build-url]: https://circleci.com/gh/kettanaito/atomic-layout
[test-coverage-url]: https://coveralls.io/github/kettanaito/atomic-layout
[dependencies-url]: https://david-dm.org/kettanaito/atomic-layout
[community-spectrum]: https://spectrum.chat/atomic-layout
[community-reactiflux]: https://discordapp.com/channels/102860784329052160/543033450924474378
[bootstrap-4-breakpoints]: https://getbootstrap.com/docs/4.0/layout/grid/#grid-options
[css-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[css-grid-support]: https://caniuse.com/css-grid
[atomic-design]: https://bradfrost.com/blog/post/atomic-web-design/
[atomic-layout-docs]: https://redd.gitbook.io/atomic-layout
[react]: https://github.com/facebook/react
[styled-components]: https://github.com/styled-components/styled-components
