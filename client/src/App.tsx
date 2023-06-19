import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Category from './pages/Category'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Library from './pages/Library'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library/:libraryContent" element={<Library />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/profile/:anime" element={<Profile />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/search/:searchItem" element={<Search />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App