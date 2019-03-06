import React from 'react'
import Box from './Box'
import { render, cleanup, getByText } from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

test('Renders default Box', () => {
  const { container } = render(<Box padding={10}>Content</Box>)
  const renderedBox = getByText(container, 'Content')
  expect(renderedBox).toHaveTextContent('Content')
  expect(renderedBox).toHaveStyle('display:block')
  expect(renderedBox).toHaveStyle('padding:10px')
})

test('Renders inline Box', () => {
  const { container } = render(
    <Box inline padding={10}>
      Content
    </Box>,
  )
  const renderedBox = getByText(container, 'Content')
  expect(renderedBox).toHaveTextContent('Content')
  expect(renderedBox).toHaveStyle('display:inline-block')
})

test('Supports Flexbox display model', () => {
  const { container } = render(
    <Box flex alignItems="center">
      Content
    </Box>,
  )
  const renderedBlock = getByText(container, 'Content')
  expect(renderedBlock).toHaveTextContent('Content')
  expect(renderedBlock).toHaveStyle('display:flex')
  expect(renderedBlock).toHaveStyle('align-items:center')
})

test('Supports inline Flexbox display model', () => {
  const { container } = render(
    <Box flex inline justifyContent="center">
      Content
    </Box>,
  )
  const renderedBlock = getByText(container, 'Content')
  expect(renderedBlock).toHaveTextContent('Content')
  expect(renderedBlock).toHaveStyle('display:inline-flex')
  expect(renderedBlock).toHaveStyle('justify-content:center')
})
