import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `px-4 py-3 border-gray-200 bg-gray-50 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </div>
    );
}
