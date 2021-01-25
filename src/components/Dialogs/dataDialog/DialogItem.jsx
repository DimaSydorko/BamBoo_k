import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

const Person = (props) => {
  return(
    <div>
      <div className={s.person}>
          <NavLink to={"/dialogs/"+props.id} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>
    </div>
  )
}

export default Person;