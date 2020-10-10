import React, { useRef, useEffect, useState } from 'react';
import { useOnClickOutside } from '@echoghi/hooks';
import { useTable } from 'react-table';

import Firebase from '../firebase';
import AddContact from './AddContact';
import { useAuth } from '../context/authContext';

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

export default function Contacts() {
    const { auth } = useAuth();
    const [isAddingContact, setAddingContact] = useState(false);
    const [tableData, setData] = useState([]);
    const ref = useRef();

    useOnClickOutside(ref, () => setAddingContact(false));

    useEffect(() => {
        const contactRef = Firebase.db.ref('users').child(auth.uid).child('contacts');

        const getContacts = contactRef.on('value', (snapshot) => {
            const val = snapshot.val();
            const result = val && Object.entries(val).length ? Object.entries(val) : [];

            setData(makeData(result));
        });

        return () => contactRef.off('value', getContacts);
    }, []);

    const data = tableData;

    const columns = React.useMemo(
        () => [
            {
                Header: 'Basic Info',
                accessor: 'name'
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
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="contacts__container">
            {isAddingContact && <AddContact ref={ref} />}
            <div className="contacts__heading">
                <div>
                    <h1>Contacts</h1>
                    <h2>{data.length} total</h2>
                </div>
                <div>
                    <button className="contacts__add" onClick={() => setAddingContact(!isAddingContact)}>
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
