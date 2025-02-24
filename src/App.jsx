import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductCard from './Components/ProductComponents/ProductCard'
import NavBar from './Components/NavBar'
import ProductList from './Components/ProductComponents/ProductList'
import ViewProduct from './Components/ViewProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ViewProduct/>}/>
      </Routes>
    </>
  )
}

export default App
