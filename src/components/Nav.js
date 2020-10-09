import React from 'react';
import UserMenu from './UserMenu';

export default function Nav() {
    return (
        <div>
            <div className="nav">
                <UserMenu />
            </div>
            <div className="sidenav"></div>
        </div>
    );
}
