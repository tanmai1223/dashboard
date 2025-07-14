import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import style from '../styles/Header.module.css'
import { AuthContext } from '../context/AuthContext'
function Header() {
  const {logout}=useContext(AuthContext)
  return (
    <div className={style.headingsHeader}>
      <h1>Super app</h1>
      <img src="profile.png" alt="img not available" onClick={logout} />
      <Outlet />
    </div>
  )
}

export default Header
