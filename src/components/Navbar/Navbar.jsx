import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

// import s from './../Dialogs/Dialogs.module.css';

const Page = (props) => {
  return(
    <div>
      <NavLink to={props.link} activeClassName={s.activeLink}>{props.name}</NavLink>
    </div>
  )
}

const Person = (props) => {
  return(
    <div className={s.person}>
        <NavLink to={"/dialogs/"+props.id} activeClassName={s.activeLink}>
          <img className={s.avaPerson} src={props.avaImg} alt=""/>
          <div className={s.name}>{props.name}</div>
        </NavLink>
    </div>
  )
}
 
const Navbar = (props) => {
   let dialogData = props.dataDialogs.map(dialog => 
    <Person name={dialog.name} id={dialog.id} avaImg={dialog.ava}/>)

  return (
    <nav className={`${s.nav} ${s.item}`}>
      <Page link="/profile" name="Profile"/>
      <Page link="/dialogs" name="Mesages"/>
      <Page link="/news" name="News"/>
      <Page link="/music" name="Music"/>
      <Page link="/settings" name="Settings"/>

      <div className={s.resent}>Recent
        <div className={s.people}>
          {dialogData}
        </div>        
      </div>

    </nav>
  )
}
export default Navbar;