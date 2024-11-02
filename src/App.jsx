import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import {REQUEST_OPTIONS, API_BASE_URL} from '../config'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Register from './components/Register'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
