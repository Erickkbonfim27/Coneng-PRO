import { Link } from 'react-router-dom'
import React, { useContext } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

/* contexts */
import { Context } from '../../context/UserContext'

/* hooks */

function Navbar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
      </div>
      <ul>
        <li>
          <Link to="/">Profissionais</Link>
        </li>
        {authenticated ? (
          <>
            <li>
                <Link to="/serv/myService">Cadastre um Serviço</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/serv/meusprofissionais">Meus Profissionais</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar