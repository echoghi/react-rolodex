import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../context/appContext';
import UserMenu from './UserMenu';

export default function Nav() {
    const { sideNav, setSideNav } = useAppState();

    return (
        <div>
            <div className="nav">
                <i className="fas fa-bars" onClick={() => setSideNav(!sideNav)}></i>
                <UserMenu />
            </div>
            <div className={`sidenav ${sideNav ? '' : 'hide'}`}>
                <Link to="/profile">
                    <i className="fas fa-user" />
                </Link>
                <Link to="/">
                    <i className="fas fa-users" />
                </Link>
            </div>
        </div>
    );
}
