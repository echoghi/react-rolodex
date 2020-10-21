import React from 'react';

export const DefaultColumnFilter = ({
    column: {
        filterValue,
        setFilter,
        preFilteredRows: { length }
    }
}) => {
    return (
        <input
            value={filterValue || ''}
            className="input filter"
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`search (${length})...`}
        />
    );
};

export const Filter = ({ column }) => {
    return <div style={{ marginTop: 5 }}>{column.canFilter && column.render('Filter')}</div>;
};
