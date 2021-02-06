import React from 'react';
import s from './Header.module.css';
import logo from '../../Image/logo_1.png';

const Header = () => {
  return (
      <header className={s.header}>
        <img className ={s.img} src={logo}></img>
        <div className={s.name}>BamBoo k</div>
      </header>
  )
}
export default Header;