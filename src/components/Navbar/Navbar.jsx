import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Page = (props) => {
  return(
    <div>
      <NavLink to={props.link} activeClassName={s.activeLink}>{props.name}</NavLink>
    </div>
  )
}

const Navbar = (props) => {
  return (
    <nav className={`${s.nav} ${s.item}`}>
      <Page link="/profile" name="Profile"/>
      <Page link="/dialogs" name="Mesages"/>
      <Page link="/news" name="News"/>
      <Page link="/music" name="Music"/>
      <Page link="/settings" name="Settings"/>
  </nav>
  )
}
export default Navbar;