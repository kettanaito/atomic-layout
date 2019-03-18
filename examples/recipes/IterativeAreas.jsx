import React from 'react'
import { Composition } from 'atomic-layout'

const dataOne = [
  { id: 'abc', text: 'Foo' },
  { id: 'def', text: 'Bar' },
  { id: 'ghi', text: 'Doe' },
]

const dataTwo = [
  { id: 123, text: '123' },
  { id: 456, text: '456' },
  { id: 789, text: '789' },
]

const List = () => (
  <>
    <Composition id="composition-one" areas="singleArea" gutter={10}>
      {({ SingleArea }) =>
        dataOne.map((entry) => (
          <SingleArea key={entry.id} id={entry.id} col="auto">
            <p>{entry.text}</p>
          </SingleArea>
        ))
      }
    </Composition>

    <Composition id="composition-two" areas="singleArea" gutter={10}>
      {({ SingleArea }) =>
        dataTwo.map((entry) => (
          <SingleArea key={entry.id} id={entry.id} row="auto">
            <p>{entry.text}</p>
          </SingleArea>
        ))
      }
    </Composition>
  </>
)

export default List
