---
description: A single component to distribute spacial relation in your layouts.
---

<p align="center">
  <img src="https://img.shields.io/npm/v/atomic-layout.svg" alt="npm version" />
  <img src="https://img.shields.io/circleci/project/github/kettanaito/atomic-layout/master.svg" alt="Build status" />
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

## Documentation

See the [Official documentation](https://redd.gitbook.io/atomic-layout).

Here are some shortcuts to get you started:

- [Philosophy](https://redd.gitbook.io/atomic-layout/general/philosophy)
- [**Getting started**](https://redd.gitbook.io/atomic-layout/general/getting-started)
- [Responsive props](https://redd.gitbook.io/atomic-layout/general/responsive-props)
- [Best practices](https://redd.gitbook.io/atomic-layout/general/best-practices)

Create a [Pull request](https://github.com/kettanaito/atomic-layout/pulls) to improve the documentation!

## Browser support

| Chrome | Firefox | IE   | Edge | Safari | iOS Safari |
| ------ | ------- | ---- | ---- | ------ | ---------- |
| 65+    | 59+     | 11\* | 16+  | 11.1+  | 10.3+      |

> \* Partial support of an [older version](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/) of CSS Grid specification.
