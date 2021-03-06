import React from 'react';

export default function Input({ name, type = 'text', error, className, ...props }) {
    const inputClassName = (err) => (err ? `input error ${className}` : `input ${className}`);

    return (
        <label>
            {name}
            <input type={type} className={inputClassName(error)} {...props} />
            <div className="error__message">{error}</div>
        </label>
    );
}
