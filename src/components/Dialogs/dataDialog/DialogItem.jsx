import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

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

export default Person;