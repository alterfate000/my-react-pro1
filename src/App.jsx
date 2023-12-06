import { useState } from 'react'
import reactLogo from './assets/react.svg' ;
import viteLogo from '/vite.svg' ;
import './App.css' ;
//import Hello from './test'
import Nav from './component/Nav' ;
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{count}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} style={{margin:20}}>
          count is + 1
        </button>
        <button onClick={() => setCount((count) => count - 1)} style={{margin:20}}>
          count is - 1
        </button>
        <button onClick={() => setCount((count) => count + 2)} style={{margin:20}}>
          count is + 2
        </button>
        <p><Hello/></p>
        <button onClick={() => setCount((count) => count = 0)} style={{margin:20}}>
          Reset Count
        </button>
        
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Nav/>
    </>
  )
}

export default App
