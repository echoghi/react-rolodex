import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function Nav() {
    const [open, setSideNav] = useState(true);

    return (
        <div>
            <div className="nav">
                <i className="fas fa-bars" onClick={() => setSideNav(!open)}></i>
                <UserMenu />
            </div>
            <div className={`sidenav ${open ? '' : 'hide'}`}>
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
