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

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            id="custom-select"
            type="select"
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export const Filter = ({ column }) => {
    return <div style={{ marginTop: 5 }}>{column.canFilter && column.render('Filter')}</div>;
};
