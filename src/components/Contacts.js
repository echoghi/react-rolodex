import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '@echoghi/hooks';
import { useTable } from 'react-table';

import AddContact from './AddContact';

const mockData = [
    { name: 'Bob Saget', company: 'Google', phone: '650 666-6666', created: 'now', updated: 'now' },
    { name: 'Emily Saget', company: 'Facebook', phone: '650 666-6666', created: 'now', updated: 'now' }
];

export default function Contacts() {
    const [isAddingContact, setAddingContact] = useState(false);
    const ref = useRef();

    useOnClickOutside(ref, () => setAddingContact(false));

    const data = React.useMemo(() => mockData, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Basic Info',
                accessor: 'name'
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
                    <span>{data.length} total</span>
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
                                    <th
                                        {...column.getHeaderProps()}
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
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
