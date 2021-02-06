import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';
import avaImg from '../../../Image/ava/FrendAva.png';

const Person = (props) => {
  return(
    <div>
      <div className={s.person}>
          <NavLink to={"/dialogs/"+props.id} activeClassName={s.activeLink}>
          <img className={s.avaPerson} src={avaImg} alt=""/>
          {props.name}
          </NavLink>
        </div>
    </div>
  )
}

export default Person;