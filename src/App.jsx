import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Register from './components/Register'
import UserHome from './components/UserHome'
import { UserProvider } from './contexts/userContext'

function App() {
  return (
    <div>
        <UserProvider>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/user-home' element={<UserHome/>} />
              <Route path='/register' element={<Register/>} />
            </Routes>
          </Router>
        </UserProvider>
    </div>
  )
}

export default App
