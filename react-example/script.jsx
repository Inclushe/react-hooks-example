import { useEffect, useState, useContext, useRef, useMemo, useCallback, createContext, useReducer } from 'react';
import * as ReactDOM from 'react-dom/client';

const moods = {
  happy: '😀',
  sad: '😢'
}

const MoodContext = createContext(moods)

function App(props) {
  const [truthy, setTruthy] = useState(true)
  const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      default:
        throw new Error()
    }
  }, 0)
  var refCount = useRef(0)

  const expensiveCount = useMemo(() => {
    return count ** 2
  }, [count])

  const showCount = useCallback(() => {
    console.log(`Count is ${count}`)
  }, [count])

  useEffect(() => {
    console.log('This is fired when the component is mounted or updated')
    console.log(refCount)
    return () => {console.log('This is fired before this effect is run again')}
  })

  useEffect(() => {
    console.log('Something happened to count!')
  }, [count])

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
      <button onClick={() => setTruthy(!truthy)}>
        I am {String(truthy)}. Click to turn me {String(!truthy)}.
      </button>
      <button onClick={() => refCount.current++}>
        refCount has a value of {refCount.current} but the UI won't update until the next render
      </button>
      <br/>
      <MoodContext.Provider value={moods.happy}>
        <MoodEmoji />
      </MoodContext.Provider>
      <br/>
      <p>Count: {state}</p>
      <button onClick={() => dispatch({type: 'decrement'})}>
        Click to decrement state
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>
        Click to increment state
      </button>
    </>
  )
}

function MoodEmoji () {
  const mood = useContext(MoodContext)
  return <span>{mood}</span>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
