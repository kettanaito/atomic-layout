# Props

> **Note:** All `Number` value types are set in `rem`. Example: `gutter={2}` sets the `grid-gap` value to `2rem`.

| Prop name      | Value type | Description                        |
| -------------- | ---------- | ---------------------------------- |
| `template`     | `String`   | Alias for "grid-template-areas".   |
| `templateCols` | `String`   | Alias for "grid-template-columns". |
| `templateRows` | `String`   | Alias for "grid-template-rows".    |
| `gutter`       | `Number`   | Alias for "grid-gap".              |
| `gutterCol`    | `Number`   | Alias for "grid-gap-column".       |
| `gutterRow`    | `Number`   | Alias for "grid-gap-row".          |
| `col`          | `Number`   | Alias for "grid-column".           |
| `colStart`     | `Number`   | Alias for "grid-column-start".     |
| `colEnd`       | `Number`   | Alias for "grid-column-end".       |
| `row`          | `Number`   | Alias for "grid-row".              |
| `rowStart`     | `Number`   | Alias for "grid-start".            |
| `rowEnd`       | `Number`   | Alias for "grid-end".              |

## Alignment

| Prop name        | Value type | Description                  |
| ---------------- | ---------- | ---------------------------- |
| `align`          | `String`   | Alias for "align-self".      |
| `alignItems`     | `String`   | Alias for "align-items".     |
| `alignContent`   | `String`   | Alias for "align-content".   |
| `justify`        | `String`   | Alias for "justify-self".    |
| `justifyItems`   | `String`   | Alias for "justify-items".   |
| `justifyContent` | `String`   | Alias for "justify-content". |
| `place`          | `String`   | Alias for "place-self".      |
| `placeItems`     | `String`   | Alias for "place-items".     |
| `placeContent`   | `String`   | Alias for "place-content".   |

## Dimensions

| Prop name | Value type | Description |
| --------- | ---------- | ----------- |
| `height`  | `Number`   | –           |
| `width`   | `Number`   | –           |

## Spacial

| Prop name           | Value type | Description                                |
| ------------------- | ---------- | ------------------------------------------ |
| `margin`            | `Number`   | –                                          |
| `marginTop`         | `Number`   | –                                          |
| `marginRight`       | `Number`   | –                                          |
| `marginBottom`      | `Number`   | –                                          |
| `marginLeft`        | `Number`   | –                                          |
| `marginVertical`    | `Number`   | Combines `marginTop` and `marginBottom`.   |
| `marginHorizontal`  | `Number`   | Combines `marginRight` and `marginLeft`.   |
| `padding`           | `Number`   | –                                          |
| `paddingTop`        | `Number`   | –                                          |
| `paddingRight`      | `Number`   | –                                          |
| `paddingBottom`     | `Number`   | –                                          |
| `paddingLeft`       | `Number`   | –                                          |
| `paddingVertical`   | `Number`   | Combines `paddingTop` and `paddingBottom`. |
| `paddingHorizontal` | `Number`   | Combines `paddingRight` and `paddingLeft`. |

## Responsive

**Any** of the aforementioned props can have a value for specific media query. To set it follow this schema:

```
propName + mediaQuery + behavior?
```

### Media queries

`xs`, `sm`, `md` and `lg` inherited from [Bootstrap Grid](https://getbootstrap.com/docs/4.0/layout/grid/#grid-options).

### Behavior

* `up` The provided media query and up.
* `down` The providede media query and down.
* `only` Only the provided media query.

For example, let's say that `gutter` should be `1` on the small screns, but `2` on medium and larger screens:

### Example

```
<Layout
  gutter={1}
  gutterMdUp={2} />
```
