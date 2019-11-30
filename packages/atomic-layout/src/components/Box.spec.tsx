import React from 'react'
import { render, cleanup, getByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Box from './Box'

describe('Box', () => {
  afterEach(cleanup)

  it('renders default Box', () => {
    const { container } = render(<Box padding={10}>Content</Box>)
    const renderedBox = getByText(container, 'Content')

    expect(renderedBox).toHaveTextContent('Content')
    expect(renderedBox).toHaveStyle('display:block')
    expect(renderedBox).toHaveStyle('padding:10px')
  })

  it('renders inline Box', () => {
    const { container } = render(
      <Box inline padding={10}>
        Content
      </Box>,
    )
    const renderedBox = getByText(container, 'Content')

    expect(renderedBox).toHaveTextContent('Content')
    expect(renderedBox).toHaveStyle('display:inline-block')
  })

  it('supports flexbox display model', () => {
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

  it('supports inline flexbox display model', () => {
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
})
