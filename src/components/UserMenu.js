import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '@echoghi/hooks';

import { displayName } from '../lib/util';
import Firebase from '../firebase';
import { useAuth } from '../context/authContext';

function UserMenu() {
    const { auth } = useAuth();
    const [open, setMenu] = useState(false);
    const ref = useRef();

    useOnClickOutside(ref, () => setMenu(false));

    const closeMenu = () => {
        setMenu(false);
    };

    const toggleMenu = () => {
        setMenu(!open);
    };

    const logOutHandler = () => {
        Firebase.auth.signOut();
    };

    return (
        <div className="user__menu--wrapper" ref={ref}>
            <div className="user__wrapper" onClick={toggleMenu}>
                {[
                    // User Photo
                    auth.photoURL && <img className="user__image" key={0} src={auth.photoURL} alt={auth.email} />,
                    // Default user icon
                    !auth.photoURL && <div className="user__image--backup" key={1} />
                ].filter(Boolean)}
                <span>{displayName(auth.displayName)}</span>
                <i className="fa fa-chevron-down" />
            </div>

            {open && (
                <div>
                    <ul className="user__menu">
                        <li>
                            <i className="fas fa-user" />
                            <Link onClick={closeMenu} to="profile">
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <i className="fas fa-user-cog" />
                            <Link onClick={closeMenu} to="settings">
                                Account Settings
                            </Link>
                        </li>
                        <li onClick={logOutHandler}>
                            <i className="fas fa-sign-out-alt"></i>Log Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
