<p align="center">
  <a href="https://www.npmjs.com/package/atomic-layout" target="_blank">
    <img src="https://img.shields.io/npm/v/atomic-layout.svg" alt="npm version" />
  </a>
  <a href="https://circleci.com/gh/kettanaito/atomic-layout" target="_blank">
    <img src="https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg" alt="Build status" />
  </a>
  <a href="https://coveralls.io/github/kettanaito/atomic-layout" target="_blank">
    <img src="https://coveralls.io/repos/github/kettanaito/atomic-layout/badge.svg" alt="Test coverage" />
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/atomic-layout.svg" alt="Library size (minzip)" />
  <img src="https://img.shields.io/david/kettanaito/atomic-layout.svg" alt="Dependencies status" />
  <img src="https://img.shields.io/david/dev/kettanaito/atomic-layout.svg" alt="Development dependencies status" />
</p>

<br>

<p align="center">
  <img src="./logo.png" alt="Atomic layout" width="200" />
</p>

<h1 align="center">Atomic layout</h1>

[Atomic layout](https://github.com/kettanaito/atomic-layout) is an implementational paradigm that delegates spacial distribution between any layout composites to the dedicated layer. It helps to create declarative, immutable, and maintainable layouts based on CSS Grid.

<br>

<p align="center">
  <img src="example.png" width="650" />
</p>

> Atomic layout uses [Bootstrap 4 breakpoints](https://getbootstrap.com/docs/4.0/layout/grid/#grid-options) by default. You can always [define custom breakpoints](https://redd.gitbook.io/atomic-layout/api/layout/configure) to match your very requirements.

## Motivation

Think of how you create layouts today. Most likely you have a set of reusable units \(atoms\) to combine them into functional compositions. However, layout is also about spacing and positioning. So you manage CSS properties to ensure your layout is just right. Guess what, not only that results into your writing more CSS, but that also makes your atoms _contextual_, thus _non-predictable_.

Atomic layout solves this problem by introducing a dedicated layer responsible for spacial distribution in your layouts. That allows to reuse atom components in any layout possible **without mutating** those composites.

## Install

```bash
npm install atomic-layout --save
```

> Requires to have [React](https://github.com/facebook/react) (15.0+) and [styled-components](https://github.com/styled-components/styled-components) (3.0+) as the peer dependencies.

## Documentation

See the [Official documentation](https://redd.gitbook.io/atomic-layout).

Here are some shortcuts to get you started:

- [Motivation](https://redd.gitbook.io/atomic-layout/general/motivation)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/general/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Recipes](https://redd.gitbook.io/atomic-layout/general/recipes)

## Browser support

See the [Support table for CSS Grid](https://caniuse.com/css-grid).

## Contributing

Please see the [Contribution guidelines](https://redd.gitbook.io/atomic-layout/developers/contributing) beforehand. The issues labeled [`help wanted`](https://github.com/kettanaito/atomic-layout/labels/help%20wanted) or [`good first issue`](https://github.com/kettanaito/atomic-layout/labels/good%20first%20issue) are, usually, a great place to get your first contribution to the project. Thank you.
