<p align="center">
  <a href="https://www.npmjs.com/package/atomic-layout" target="_blank">
    <img src="https://img.shields.io/npm/v/atomic-layout.svg" alt="Package version" />
  </a>
  <a href="https://circleci.com/gh/kettanaito/atomic-layout" target="_blank">
    <img src="https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg" alt="Build status" />
  </a>
  <a href="https://coveralls.io/github/kettanaito/atomic-layout" target="_blank">
    <img src="https://coveralls.io/repos/github/kettanaito/atomic-layout/badge.svg" alt="Test coverage" />
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/atomic-layout.svg" alt="Package size (minzip)" />
  <img src="https://img.shields.io/david/kettanaito/atomic-layout.svg" alt="Dependencies status" />
  <img src="https://img.shields.io/david/dev/kettanaito/atomic-layout.svg" alt="Development dependencies status" />
  <a href="https://img.shields.io/discord/102860784329052160.svg?label=Chat&logo=discord&style=flat">
    <img src="https://img.shields.io/discord/102860784329052160.svg?label=Chat&logo=discord&style=flat" alt="Discord channel">
  </a>
</p>

<br>

<p align="center">
  <img src="./logo.svg" alt="Atomic layout" width="200" />
</p>

<h1 align="center">Atomic layout</h1>

[Atomic layout](https://github.com/kettanaito/atomic-layout) is an implementational paradigm that delegates spacial distribution between any layout composites to the dedicated layer. That helps to create declarative, immutable, and maintainable layouts using CSS Grid.

<br>

<p align="center">
  <img src="example.png" width="650" />
</p>

> Atomic layout uses [Bootstrap 4 breakpoints](https://getbootstrap.com/docs/4.0/layout/grid/#grid-options) by default. You can always [define custom breakpoints](https://redd.gitbook.io/atomic-layout/api/layout/configure#breakpoints) to match your very requirements.

## Motivation

Think of how we create layouts today. Most likely we define a set of reusable units \(atoms\) to combine them into functional compositions. But how do we handle spacing that should describe the position of our units? Usually, we manage CSS properties of those units to make sure the spacing is just right. Not only that results into writing redundant CSS, but it also makes our atoms **contextual** and, thus, **non-maintainable**.

Atomic layout solves this problem by exposing a dedicated layer responsible for spacial distribution in a layout, or any of its parts. That allows to reuse atom components in any layout possible **without mutating** them.

## Install

Install the package using any package manager (npm, yarn, etc.):

```bash
yarn add atomic-layout
```

> Requires [React](https://github.com/facebook/react) (15.0+) and [styled-components](https://github.com/styled-components/styled-components) (3.0+) as peer dependencies. Make sure those are installed.

## Documentation

See the [Official documentation](https://redd.gitbook.io/atomic-layout).

Here are some shortcuts to get you started:

- [Motivation](https://redd.gitbook.io/atomic-layout/general/motivation)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/general/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Recipes](https://redd.gitbook.io/atomic-layout/general/recipes)

## Materials

### The Future of Layouts (React Vienna)

Watch Artem discussing the biggest obstacle to achieve maintainable layouts, and showcases a way to combine existing technologies to build clean UI implementations using Atomic layout.

<a href="https://www.youtube.com/watch?v=x_93DjN_bUA">
  <img width="500" src="./materials/react-vienna-thumbnail.jpg" alt="The Future of Layouts — Artem Zakharchenko" />
</a>

- [**Live demo** (Codesandbox)](https://codesandbox.io/s/8z6xnmnnnj)

## Browser support

> **See the [Support table for CSS Grid](https://caniuse.com/css-grid)**. For Internet Explorer support please read through [this issue](https://github.com/kettanaito/atomic-layout/issues/92).

## Contributing

Thank you to those deciding to contribute! Your involvement makes a significant impact on the library and its future.

After reading the [Contribution guidelines](https://redd.gitbook.io/atomic-layout/developers/contributing), take a look at the issues labeled [`help wanted`](https://github.com/kettanaito/atomic-layout/labels/help%20wanted) or [`good first issue`](https://github.com/kettanaito/atomic-layout/labels/good%20first%20issue), those are a good place to start. Feature suggestions or bug reports, discussion, and pull requests are always welcome.
