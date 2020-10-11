import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useOnClickOutside } from '@echoghi/hooks';
import { useTable } from 'react-table';

import Firebase from '../firebase';
import AddContact from './AddContact';
import { useAuth } from '../context/authContext';
import { useAppState } from '../context/appContext';
import { displayName, makeData } from '../lib/util';

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

    const removeContact = (id) => {
        const contactRef = Firebase.db.ref('users').child(auth.uid).child(`contacts`).child(id);
        setOptionsMenu(false);

        contactRef
            .remove()
            .then(() => {
                alert('Contact removed');
            })
            .catch(() => {
                console.warn('Contact could not be removed');
            });
    };

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
                    const { id } = cellProps.row.original;
                    const rowId = cellProps.row.id;

                    return (
                        <div>
                            <div className="table__options">
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            {optionsMenu === rowId && (
                                <div ref={menuRef}>
                                    <ul className="table__menu">
                                        <li>
                                            <i className="fas fa-user-edit"></i>
                                        </li>
                                        <li onClick={() => removeContact(id)}>
                                            <i className="fas fa-trash"></i>
                                        </li>
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
                        <i className="fas fa-user-plus"></i>Add Contact
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
                                        const optionsMenuHandler =
                                            cell.column.id === 'Options'
                                                ? () => setOptionsMenu(cell.row.id)
                                                : undefined;
                                        return (
                                            <td
                                                className="table__cell"
                                                onClick={optionsMenuHandler}
                                                {...cell.getCellProps()}
                                            >
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
