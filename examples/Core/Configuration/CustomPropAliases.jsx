import React from 'react'
import Layout, { Box } from 'atomic-layout'

export default class CustomUnit extends React.Component {
  componentDidMount() {
    Layout.configure({
      propAliases: {
        textAlign: {
          output: ['text-align'],
        },
        fontSize: {
          output: ['font-size'],
          transformValue: (value, Layout) => {
            return Layout.transformNumeric(value)
          },
        },
      },
    })
  }

  render() {
    return (
      <>
        <Box id="box-one" textAlign="center">
          Content
        </Box>
        <Box id="box-two" fontSize={2}>
          Content
        </Box>
        <Box id="box-three" fontSize="20px">
          Content
        </Box>
      </>
    )
  }
}
