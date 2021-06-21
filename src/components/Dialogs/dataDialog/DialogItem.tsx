import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './../Dialogs.module.css';

type PersonPropsType = {
  id: number 
  name: string
  avaImg: string
}

const Person: React.FC<PersonPropsType> = (props) => {
  return(
    <div className={styles.person}>
        <NavLink to={"/dialogs/"+props.id} activeClassName={styles.activeLink}>
          <img className={styles.avaPerson} src={props.avaImg} alt=""/>
          <div className={styles.name}>{props.name}</div>
        </NavLink>
    </div>
  )
}

export default Person;