[![Package version](https://img.shields.io/npm/v/@atomic-layout/core.svg?color=%237B85FF)](https://npmjs.com/package/@atomic-layout/core)

# `@atomic-layout/core`

[Atomic Layout][atomic-layout] core library.

> **Please note that as a user of Atomic Layout you are not supposed to use this package directly in your application.** It serves as a logic abstraction for various rendering implementations (with styled-components, emotion, etc.). Use this package if you are planning to introduce a new styling implementation of Atomic Layout.

[atomic-layout]: https://github.com/kettanaito/atomic-layout

## Motivation

Atomic Layout contains its core functionality in a separate module in order to reuse it for various styling implementations (`styled-components`, `emotion`, etc.). The logic distributed in this module is style-agnostic and mainly concerns calculations and transformations of data structures used by the library. It also provides common type definitions to be used by Atomic Layout, or its consumers.

## Scope

Atomic Layout core operates under the following scope:

### Layout interface

- `Layout` instance to be exposed by each individual styling implementation of the library
- Interface to consume layout options (`defaultUnit`, `breakpoints`, etc.)
- Interface to store the provided options and reference them

### Breakpoint transformation

- Breakpoint parsing (`getAreaRecords`)
- Breakpoint transformations (`mergeBreakpoints`, `openBreakpoint`, `closeBreakpoint`)
- Breakpoint compiling (`createMediaQuery`)

### Media Query handling

- Normalization of media queries (`normalizeMediaQuery`)

### Utilities

- String utilities (i.e. `toCammelCase`, `toLowerCaseFirst`)
- Math utilities (i.e. `transformNumeric`)
- Functional utilities (i.e. `compose`, `when`, `memoizeWith`)

## Type definitions

> Refer to the complete type definition module `atomic-layout/core/lib/index.d.ts`.

The common use case to access the types exported by this package is to provide a proper type annotation to your custom React components that accept the same props as the library's components do (`Box`, `Composition`, `Only`, etc.).

Here's an example of how to annotate a custom React component that accepts all the props that the `Box` component does:

```tsx
import * as React from 'react'
import { BoxProps } from 'atomic-layout/core'

const MyComponent: React.FC<BoxProps & MyComponentProps> = ({
  children,
  ...boxProps
}) => {
  return <Box {...boxProps}>{children}</Box>
}
```

## Contributing

### Fork the repository

Fork this repository using the "Fork" button on the top right of the [repository page](https://github.com/kettanaito/atomic-layout/tree/master/packages/atomic-layout-core).

### Follow Git workflow

Please follow the [Git workflow](https://github.com/kettanaito/atomic-layout/blob/master/.github/CONTRIBUTING.md#git-workflow) described in the contribution guidelines to the original library.

## License

MIT.
