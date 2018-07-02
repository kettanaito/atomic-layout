<p align="center">
  <img src="https://img.shields.io/npm/v/atomic-layout.svg" alt="npm version" />
  <img src="https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg" alt="Build status" />
  <a href="https://coveralls.io/github/kettanaito/atomic-layout?branch=master">
    <img src="https://coveralls.io/repos/github/kettanaito/atomic-layout/badge.svg?branch=master" alt="Tests coverage" />
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/atomic-layout.svg" alt="Library size (minzip)" />
</p>

<p align="center">
  <img src="./logo.png" alt="Atomic layout" />
</p>

<h1 align="center">Atomic layout</h1>

[Atomic layout](https://github.com/kettanaito/atomic-layout) is an implementational paradigm that delegates the distribution of spacial relation between any layout composites to the dedicated layer. Put shortly, it helps you to create reusable, efficient and fast responsive layouts with _close to no CSS_.

<p align="center">
  <img src="example.png" style="max-width:650px" />
</p>

> Atomic layout uses [Bootstrap 4 breakpoints](https://getbootstrap.com/docs/4.0/layout/grid/#grid-options) by default. You can [configure custom breakpoints](https://redd.gitbook.io/atomic-layout/api/layout/configure) to match your very requirements.

## Motivation

Think of how you create layouts today. Most likely you have a set of reusable units \(atoms\) to combine them into functional compositions. However, layout is also about spacing and positioning. So you manage CSS properties to ensure your layout is just right. Guess what, not only that results into your writing more CSS, but that also makes your atoms _contextual_, thus _non-predictable_.

Atomic layout solves this problem by introducing a dedicated layer responsible for spacial distribution in your layouts. That allows to reuse atom components in any layout possible **without mutating** those composites.

## Install

> Although Atomic layout is a principle not bound to any specific technology, the current version is powered by `React` and `styled-components`. [Submit a pull request](https://github.com/kettanaito/atomic-layout/pulls) to support more great technologies.

### Peer dependencies

- [React](https://github.com/facebook/react) (15.0+)
- [styled-components](https://github.com/styled-components/styled-components) (3.0+)

### Atomic layout

```bash
npm install atomic-layout
```

## Documentation

See the [Official documentation](https://redd.gitbook.io/atomic-layout).

Here are some shortcuts to get you started:

- [Philosophy](https://redd.gitbook.io/atomic-layout/general/philosophy)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/general/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [Best practices](https://redd.gitbook.io/atomic-layout/general/best-practices)

Create a [Pull request](https://github.com/kettanaito/atomic-layout/pulls) to improve the documentation!

## Browser support

Atomic layout currently has a coverage of 84% of browser usage throughout the glob.

| Chrome | Firefox | IE   | Edge | Safari | iOS Safari |
| ------ | ------- | ---- | ---- | ------ | ---------- |
| 65+    | 59+     | 11\* | 16+  | 11.1+  | 10.3+      |

> \* Partial support of an [older version](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/) of CSS Grid specification.

## Contributing

Please see the [Contribution guidelines](https://redd.gitbook.io/atomic-layout/developers/contributing) to start shaping the way developers create layouts today! Take a look at the issues labeled [`help wanted`](https://github.com/kettanaito/atomic-layout/labels/help%20wanted) or [`good first issue`](https://github.com/kettanaito/atomic-layout/labels/good%20first%20issue) to get started. Thank you!
