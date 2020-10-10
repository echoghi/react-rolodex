import React from 'react';

export default function Input({ name, error, className, ...props }) {
    const inputClassName = (err) => (err ? `input error ${className}` : `input ${className}`);

    return (
        <label>
            {name}
            <input className={inputClassName(error)} {...props} />
            <div className="error__message">{error}</div>
        </label>
    );
}
