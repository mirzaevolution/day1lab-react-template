import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopBar } from '../../components'
import "./layout.page.css"

const Layout: React.FC = () => {
  return (
    <div className="container">
      <TopBar />
      <main className="container-main">
        <article className="container-middle">
          <div className="container-main">
            <Outlet />
          </div>
        </article>
      </main>
    </div>
  )
}

export default Layout