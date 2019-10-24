import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/img/burger-logo.png';

export default function Logo(props) {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt='burger_logo' />
    </div>
  );
}
