import React from 'react'
import styled from 'supported-styling-library'
import { query } from 'atomic-layout'

const Component = styled.div`
  font-size: 14px;

  /* Single breakpoint */
  @media ${query({ for: 'sm' })} {
    color: cyan;
  }

  /* High-pass */
  @media ${query({ from: 'md' })} {
    background-color: lightcyan;
  }

  /* Low-pass */
  @media ${query({ to: 'sm' })} {
    padding: 10px;
  }

  /* Bell */
  @media ${query({ from: 'md', to: 'xl' })} {
    margin: 20px;
  }

  /* Notch */
  @media ${query({ except: true, from: 'md', to: 'lg' })} {
    font-size: 18px;
  }
`

const QueryExample = () => {
  return <Component data-test-id="component">Content</Component>
}

export default QueryExample
