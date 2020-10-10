import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useOnClickOutside } from '@echoghi/hooks';
import { useTable } from 'react-table';

import Firebase from '../firebase';
import AddContact from './AddContact';
import { useAuth } from '../context/authContext';
import { useAppState } from '../context/appContext';
import { displayName } from '../lib/util';

function makeData(data) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
        const contact = data[i][1];

        if (contact.created && contact.updated) {
            contact.created = new Date(contact.created).toLocaleDateString('en-US');
            contact.updated = new Date(contact.updated).toLocaleDateString('en-US');
        }

        result.push(contact);
    }

    return result;
}

const BasicInfo = ({ name, relation }) => {
    return (
        <div className="contact__info">
            <h1>{displayName(name)}</h1>
            <h2>{displayName(relation)}</h2>
        </div>
    );
};

export default function Contacts() {
    const { auth } = useAuth();
    const { sideNav, newContactSuccess, setNewContactStatus } = useAppState();

    const [isAddingContact, setAddingContact] = useState(false);
    const [tableData, setData] = useState([]);
    const [optionsMenu, setOptionsMenu] = useState(null);
    const ref = useRef();
    const menuRef = useRef();

    useOnClickOutside(ref, () => {
        setAddingContact(false);
        setNewContactStatus(false);
    });
    useOnClickOutside(menuRef, () => setOptionsMenu(null));

    useEffect(() => {
        const contactRef = Firebase.db.ref('users').child(auth.uid).child('contacts');

        const getContacts = contactRef.on('value', (snapshot) => {
            const val = snapshot.val();
            const result = val && Object.entries(val).length ? Object.entries(val) : [];

            setData(makeData(result));
        });

        return () => contactRef.off('value', getContacts);
    }, []);

    const toggleAddContact = () => {
        setAddingContact(!isAddingContact);
        setNewContactStatus(false);
    };
    const data = useMemo(() => tableData);

    const columns = useMemo(
        () => [
            {
                Header: 'Basic Info',
                accessor: 'name',
                Cell: (cellProps) => {
                    const { relation, name } = cellProps.row.original;

                    return <BasicInfo name={name} relation={relation} />;
                }
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Company',
                accessor: 'company'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: 'Birthday',
                accessor: 'dob'
            },
            {
                Header: 'Created Date',
                accessor: 'created'
            },
            {
                Header: 'Last Updated',
                accessor: 'updated'
            },
            {
                Header: '',
                accessor: 'updated',
                id: 'Options',
                Cell: (cellProps) => {
                    const { id } = cellProps.row;

                    const handleClick = () => setOptionsMenu(id);

                    return (
                        <div ref={menuRef}>
                            <div className="table__options" onClick={handleClick}>
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            {optionsMenu === id && (
                                <div>
                                    <ul className="table__menu">
                                        <li>Edit</li>
                                        <li>Delete</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                }
            }
        ],
        [optionsMenu]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className={`contacts__container ${sideNav ? 'sidenav--open' : ''}`}>
            {isAddingContact && !newContactSuccess && <AddContact ref={ref} />}
            <div className="contacts__heading">
                <div>
                    <h1>Contacts</h1>
                    <h2>{data.length} total</h2>
                </div>
                <div>
                    <button className="contacts__add" onClick={toggleAddContact}>
                        Add Contact
                    </button>
                </div>
            </div>
            <div className="contacts__table">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th className="table__head" {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td className="table__cell" {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
