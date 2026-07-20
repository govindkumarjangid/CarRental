import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputBox = ({
    value,
    onChange,
    label,
    name,
    id,
    type = 'text',
    placeholder,
    title,
    as = 'input',
    options = [],
    rows = 4,
    icon: Icon,
    leftIcon: LeftIcon,
    isPassword = false,
    className = '',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const inputName = name || label || id;
    const inputId = id || label || name;

    const baseClass = `peer w-full border-2 border-gray-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-primary focus:ring-3 focus:ring-primary/30 transition-all duration-200 bg-white text-gray-800 text-sm font-medium ${className}`.trim();

    const isFloating =
        (value !== undefined && value !== null && value !== '') ||
        as === 'select' ||
        type === 'datetime-local' ||
        type === 'date' ||
        type === 'time';

    const topPositionClass = as === 'textarea'
        ? (isFloating ? 'top-0 -translate-y-1/2 text-xs text-primary font-semibold' : 'top-3')
        : (isFloating ? 'top-0 -translate-y-1/2 text-xs text-primary font-semibold' : 'top-1/2 -translate-y-1/2');

    const labelClass = `absolute ${LeftIcon ? 'left-10' : 'left-3.5'} ${topPositionClass} text-gray-400 pointer-events-none transition-all duration-200 bg-white px-1 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500`;

    return (
        <div className="relative flex flex-col w-full">
            {LeftIcon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                    <LeftIcon size={18} />
                </div>
            )}

            {as === 'textarea' ? (
                <textarea
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder || " "}
                    className={`${baseClass} resize-none ${LeftIcon ? 'pl-10' : ''} ${Icon || isPassword ? 'pr-10' : ''}`}
                    value={value ?? ''}
                    onChange={onChange}
                    rows={rows}
                    {...rest}
                />
            ) : as === 'select' ? (
                <select
                    id={inputId}
                    name={inputName}
                    className={`${baseClass} ${LeftIcon ? 'pl-10' : ''} ${Icon ? 'pr-10' : ''}`}
                    value={value ?? ''}
                    onChange={onChange}
                    {...rest}>
                    <option value="" disabled hidden>
                        {placeholder || ""}
                    </option>
                    {options.map((option, idx) => {
                        const optValue = typeof option === 'object' && option !== null ? option.value : option;
                        const optLabel = typeof option === 'object' && option !== null ? option.label : option;
                        return (
                            <option key={optValue ?? idx} value={optValue}>
                                {optLabel}
                            </option>
                        );
                    })}
                </select>
            ) : (
                <input
                    type={inputType}
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder || " "}
                    className={`${baseClass} ${LeftIcon ? 'pl-10' : ''} ${Icon || isPassword ? 'pr-10' : ''}`}
                    value={value ?? ''}
                    onChange={onChange}
                    {...rest}
                />
            )}

            {isPassword ? (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer z-10"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            ) : Icon ? (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                    <Icon size={18} />
                </div>
            ) : null}

            {title && (
                <label
                    htmlFor={inputId}
                    className={labelClass}>
                    {title}
                </label>
            )}
        </div>
    );
};

export default InputBox;
