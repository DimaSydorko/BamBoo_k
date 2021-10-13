import React from 'react';
import styles from './Header.module.css';
import logo from '../../Image/logo_1.png';
import { NavLink } from 'react-router-dom';

type HeaderPropsType = {
  isAuth: boolean,
  logout: () => void
}

const Header: React.FC<HeaderPropsType> = (props) => {
  return (
      <header className={styles.header}>
        <img className ={styles.img} src={logo} alt=''/>
        <div className={styles.name}>BamBoo k</div>

        <div className={styles.loginBlock}>
          { props.isAuth 
            ? <div>Online
                <button onClick={props.logout} className={styles.logout}>Log out</button>
              </div> 
            : <NavLink to={'/login'}>Login</NavLink> }
        </div>
      </header>
  )
}
export default Header;