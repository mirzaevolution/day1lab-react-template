import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopBar } from '../../components'
import "./layout.css"

const Layout: React.FC = () => {
  return (
    <div className="container">
      <TopBar />
      <main className="container__main">
        <article className="container__middle">
          <div className="container__main">
            <Outlet />
          </div>
        </article>
      </main>
    </div>
  )
}

export default Layout