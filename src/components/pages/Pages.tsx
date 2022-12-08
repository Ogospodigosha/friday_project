import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import {Login} from "./login/Login";
import {Registration} from "./registration/Registration";
import {Profile} from "./profile/Profile";
import {PasswordRecovery} from "./password recovery/PasswordRecovery";
import {Test} from "./test/Test";
import { Error404 } from './error404/Error404';

export const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/password_recovery'} element={<PasswordRecovery/>}/>
            <Route path={'/test'} element={<Test/>}/>
            <Route path={'/*'} element={<Error404/>}/>
        </Routes>
    );
};

