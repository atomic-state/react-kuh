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
  const [active, setActive] = useBoolean(false) // if not present, default is null

  return (
    <div>
      <button onClick={setActive.on}>Active</button>
      <button onClick={setActive.off}>Inactive</button>
      <button onClick={setActive.off}>Inactive</button>
      <button onClick={() => setActive.set(false)}>Set</button>
      <button onClick={setActive.reset}>Reset</button>
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
  const [note, setNote] = useObject<NoteType>({
    title: '',
    content: ''
  })

  function randomizeNote() {
    setNote.replace({
      title: Math.random().toString(12).split('.')[1],
      content: Math.random().toString(12).split('.')[1]
    })
  }

  return (
    <div>
      <input
        value={note.title}
        onChange={e => {
          setNote.write({
            title: e.target.value
          })
        }}
      />
      <input
        value={note.content}
        onChange={e => {
          setNote.write({
            content: e.target.value
          })
        }}
      />
      <button onClick={setNote.reset}>Reset to initial value</button>
      <button onClick={randomizeNote}>Random</button>
    </div>
  )
}
```