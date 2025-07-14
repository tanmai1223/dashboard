import React from 'react'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Widgets from './pages/Widgets'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/widget' element={<Widgets />} />
        
      </Routes>
    </div>
  )
}

export default App
