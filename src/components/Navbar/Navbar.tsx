import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

type pgagePropsType = {
  link: string
  name: string
}
const Page: React.FC<pgagePropsType> = ({link, name}) => {
  return(
    <div>
      <NavLink to={link} activeClassName={styles.activeLink}>{name}</NavLink>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className={`${styles.nav} ${styles.item}`}>
      <Page link="/profile" name="Profile"/>
      <Page link="/dialogs" name="Mesages"/>
      <Page link="/people" name="People"/>
      <Page link="/chat" name="Chat"/>
      <Page link="/news" name="News"/>
      <Page link="/music" name="Music"/>
      <Page link="/settings" name="Settings"/>
    </nav>
  )
}
export default Navbar;