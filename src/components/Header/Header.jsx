import React from 'react';
import s from './Header.module.css';

const Header = () => {
  return (
      <header className={s.header}>
        <img className ={s.img} src="https://i.pinimg.com/originals/a7/60/59/a76059460742b8ab6f06196478efc34e.png"></img>
        <div className={s.name}>BamBoo k</div>
      </header>
  )
}
export default Header;