import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'
export const Header = () => {

    return (
        <div className={s.flex}>
            <NavLink to={'/login'} className={s.link}>Login</NavLink>
            <NavLink to={'/registration'} className={s.link}>Registration</NavLink>
            <NavLink to={'/profile'} className={s.link}>Profile</NavLink>
            <NavLink to={'/404'} className={s.link}>Error 404</NavLink>
            <NavLink to={'/password_recovery'} className={s.link}>Password recovery</NavLink>
            <NavLink to={'/test'} className={s.link}>Test</NavLink>
        </div>
    );
};

