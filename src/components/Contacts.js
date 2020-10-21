import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useOnClickOutside } from '@echoghi/hooks';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';

import Firebase from '../firebase';
import AddContact from './AddContact';
import { useAuth } from '../context/authContext';
import { useAppState } from '../context/appContext';
import { displayName, makeTableData } from '../lib/util';
import { DefaultColumnFilter, Filter } from './Table';

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
    const { addToast } = useToasts();
    const { sideNav, newContactSuccess, setNewContactStatus } = useAppState();

    const [contactToEdit, setContactToEdit] = useState({});
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

            setData(makeTableData(result));
        });

        return () => contactRef.off('value', getContacts);
    }, []);

    const removeContact = (id) => {
        const contactRef = Firebase.db.ref('users').child(auth.uid).child(`contacts`).child(id);
        setOptionsMenu(false);

        contactRef
            .remove()
            .then(() => {
                addToast('Contact removed', { appearance: 'success' });
            })
            .catch(() => {
                addToast('Contact could not be removed', { appearance: 'error' });
            });
    };

    const editContact = (contact) => {
        setContactToEdit(contact);
        setAddingContact(true);
        setNewContactStatus(false);
        setOptionsMenu(false);
    };

    const toggleAddContact = () => {
        setContactToEdit({});
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
                accessor: 'email',
                Cell: (cellProps) => {
                    const { email } = cellProps.row.original;

                    return <h1 className="contact__email">{email}</h1>;
                }
            },
            {
                Header: 'Company',
                accessor: 'company',
                Cell: (cellProps) => {
                    const { company } = cellProps.row.original;

                    return <h1 className="contact__company">{company}</h1>;
                }
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                Cell: (cellProps) => {
                    const { phone } = cellProps.row.original;

                    return <h1 className="contact__phone">{phone}</h1>;
                }
            },
            {
                Header: 'Birthday',
                accessor: 'dob',
                Cell: (cellProps) => {
                    const { dob } = cellProps.row.original;

                    return <h1 className="contact__birthday">{dob}</h1>;
                }
            },
            {
                Header: 'Location',
                accessor: 'location',
                Cell: (cellProps) => {
                    const { location } = cellProps.row.original;

                    return <h1 className="contact__location">{location}</h1>;
                }
            },
            {
                Header: 'Last Updated',
                accessor: 'updated',
                Cell: (cellProps) => {
                    const { updated } = cellProps.row.original;

                    return <h1 className="contact__updated">{updated}</h1>;
                }
            },
            {
                Header: '',
                Filter: '',
                accessor: 'updated',
                id: 'Options',
                disableSortBy: true,

                Cell: (cellProps) => {
                    const { id } = cellProps.row.original;
                    const rowId = cellProps.row.id;

                    return (
                        <div className="table__options--wrapper">
                            <button type="button" className="table__options">
                                <i className="fas fa-ellipsis-h fa-sm" />
                            </button>
                            {optionsMenu === rowId && (
                                <div ref={menuRef}>
                                    <ul className="table__menu">
                                        <li onClick={() => editContact(cellProps.row.original)}>
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const generateSortingIndicator = (column) => {
        const { isSorted, isSortedDesc, Header } = column;

        if (!Header) return '';

        return (
            <div className="table__sort">
                <i className={`fas fa-caret-up ${isSorted && !isSortedDesc ? 'active' : ''}`} />
                <i className={`fas fa-caret-down ${isSorted && isSortedDesc ? 'active' : ''}`} />
            </div>
        );
    };

    return (
        <div className={`contacts__container ${sideNav ? 'sidenav--open' : ''}`}>
            {isAddingContact && !newContactSuccess && <AddContact ref={ref} {...contactToEdit} />}
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
                                        <div className="table__head--wrapper" {...column.getSortByToggleProps()}>
                                            {column.render('Header')}
                                            {generateSortingIndicator(column)}
                                        </div>
                                        <Filter column={column} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="table__row">
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

                <div className="table__pagination">
                    <div>
                        <button
                            className="table__pagination--button left"
                            type="button"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <i className="fas fa-angle-double-left fa-lg" />
                        </button>
                        <button
                            className="table__pagination--button"
                            type="button"
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                        >
                            <i className="fas fa-angle-left fa-lg" />
                        </button>
                    </div>
                    <div>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}{' '}
                        </strong>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="table__pagination--button"
                            onClick={nextPage}
                            disabled={!canNextPage}
                        >
                            <i className="fas fa-angle-right fa-lg" />
                        </button>
                        <button
                            type="button"
                            className="table__pagination--button"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            <i className="fas fa-angle-double-right fa-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
