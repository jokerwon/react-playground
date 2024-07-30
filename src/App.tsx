import { PlaygroundProvider } from './context/PlaygroundContext'
import ReactPlayground from './react-playground'

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}

export default App
