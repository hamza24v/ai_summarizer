import React from 'react'
import Demo from './pages/Demo'
import Hero from './pages/Hero'
import './App.css'

const App = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>
        </div>

        <div className='app'>
            <Hero/>
            <Demo/>
        </div>
    </main>
  )
}

export default App