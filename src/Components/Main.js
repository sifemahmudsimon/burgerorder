import React from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import { Route, Routes } from 'react-router-dom'
import Orders from './Orders/Orders'
import Checkout from './Checkout/Checkout'
import './Main.css'

const Main = () => {
  return (
    <div className="burger-background" style={{height:'100vh'}}>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<BurgerBuilder/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default Main