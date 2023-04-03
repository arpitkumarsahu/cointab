import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'

function Mainroute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default Mainroute