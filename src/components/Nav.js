import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from '../context/appContext';
import UserMenu from './UserMenu';

export default function Nav() {
    const { sideNav, setSideNav } = useAppState();
    const location = useLocation();
    const isActive = (route) => (route === location.pathname ? 'active' : '');

    return (
        <div>
            <div className="nav">
                <i className="fas fa-bars" onClick={() => setSideNav(!sideNav)}></i>
                <UserMenu />
            </div>
            <div className={`sidenav ${sideNav ? '' : 'hide'}`}>
                <Link to="/profile">
                    <i className={`fas fa-user ${isActive('/profile')}`} />
                </Link>
                <Link to="/">
                    <i className={`fas fa-users ${isActive('/')}`} />
                </Link>
            </div>
        </div>
    );
}
