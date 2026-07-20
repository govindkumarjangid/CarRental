import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputBox = ({
    value,
    onChange,
    label,
    type = 'text',
    placeholder,
    title,
    as = 'input',
    options = [],
    rows = 4,
    icon: Icon,
    leftIcon: LeftIcon,
    isPassword = false
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const baseClass = "peer w-full border-2 border-gray-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-primary focus:ring-3 focus:ring-primary/30 transition-all duration-200 bg-white text-gray-800 text-sm font-medium";

    const labelClass = `absolute ${LeftIcon ? 'left-10' : 'left-3.5'} ${as === 'textarea' ? 'top-3' : 'top-1/2 -translate-y-1/2'} text-gray-400 pointer-events-none transition-all duration-200 bg-white px-1 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500`;

    return (
        <div className="relative flex flex-col w-full">
            {LeftIcon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                    <LeftIcon size={18} />
                </div>
            )}

            {as === 'textarea' ? (
                <textarea
                    id={label}
                    name={label}
                    placeholder=" "
                    className={`${baseClass} resize-none ${LeftIcon ? 'pl-10' : ''} ${Icon || isPassword ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                />
            ) : as === 'select' ? (
                <select
                    id={label}
                    name={label}
                    className={`${baseClass} ${LeftIcon ? 'pl-10' : ''} ${Icon ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}>
                    <option value="" disabled hidden>
                        {placeholder || ""}
                    </option>
                    {options.map((option) => (
                        <option key={option.value ?? option} value={option.value ?? option}>
                            {option.label ?? option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={inputType}
                    id={label}
                    name={label}
                    placeholder=" "
                    className={`${baseClass} ${LeftIcon ? 'pl-10' : ''} ${Icon || isPassword ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}
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

            <label
                htmlFor={label}
                className={`${labelClass} ${as === 'select' && value ? 'top-0 -translate-y-1/2 text-xs font-semibold text-primary' : ''}`}>
                {title}
            </label>
        </div>
    );
};

export default InputBox;
