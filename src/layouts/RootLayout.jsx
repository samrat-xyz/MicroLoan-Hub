import React from 'react'
import Navbar from '../shared/Header/Navbar'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
       <main>
        <Outlet></Outlet>
       </main>
    </div>
  )
}

export default RootLayout
