import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '@echoghi/hooks';
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

    const displayName = (name) => {
        if (name.length > 50) {
            return `${name.substring(0, 50)}...`;
        } else {
            return name;
        }
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
            </div>

            {open && (
                <div>
                    <ul className="user__menu" onClose={closeMenu}>
                        <li>
                            <Link onClick={closeMenu} to="profile">
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="settings">
                                Account Settings
                            </Link>
                        </li>
                        <li onClick={logOutHandler}>Log Out</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
