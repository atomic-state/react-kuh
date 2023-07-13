### react-kuh

TypeScript-ready React (kinda) useful hooks

#### `useWindowSize()`

Usage

```tsx
import { useWindowSize } from 'react-kuh'

function App(){
  const windowSize = useWindowSize()

  return (
    <div>
      <p>Width: {windowSize.width}</p>
      <p>Height: {windowSize.height}</p>
    </div>
  )
}
```

#### `useBoolean()`

Usage

```tsx
import { useBoolean } from 'react-kuh'

function App(){
  const [active, actions] = useBoolean(false) // if not present, default is null

  return (
    <div>
      <button onClick={actions.on}>Active</button>
      <button onClick={actions.off}>Inactive</button>
      <button onClick={actions.off}>Inactive</button>
      <button onClick={() => actions.set(false)}>Set</button>
      <button onClick={actions.reset}>Reset</button>
    </div>
  )
}
```

#### `useObject`

Usage

```tsx
import { useObject } from 'react-kuh'

type NoteType = {
  title: string
  content: string
}

function App() {
  // Type is not required if it should be inferred from the default value
  const [note, actions] = useObject<NoteType>({
    title: '',
    content: ''
  })

  function randomizeNote() {
    actions.setValue({
      title: Math.random().toString(12).split('.')[1],
      content: Math.random().toString(12).split('.')[1]
    })
  }

  return (
    <div>
      <input
        value={note.title}
        onChange={e => {
          actions.setPartialValue({
            title: e.target.value
          })
        }}
      />
      <input
        value={note.content}
        onChange={e => {
          actions.setPartialValue({
            content: e.target.value
          })
        }}
      />
      <button onClick={actions.reset}>Reset to initial value</button>
      <button onClick={randomizeNote}>Random</button>
    </div>
  )
}
```


#### `useSecondRender`

Returns `true` after the first render


#### `BrowserOnly` (component)

This component renders its children after the first render. This can be used as a boundary when using SSR and a component should only be rendered in the client.

Usage

```jsx
import { BrowserOnly } from 'react-kuh'

export default function Page(){
  return (
    <div>
      <h2>This is SSR</h2>
      <BrowserOnly>
        <p>This is not SSR</p>
      </BrowserOnly>
    </div>
  )
}
```