
const InputBox = ({ value, onChange, label, type = 'text', placeholder, title, as = 'input', options = [], rows = 4, icon: Icon }) => {

    const baseClass = "peer w-full border-2 border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/40 transition-all duration-300 bg-transparent"

    const labelClass = `absolute left-4 ${as === 'textarea' ? 'top-2' : 'top-1/2 -translate-y-1/2'} text-gray-500 pointer-events-none transition-all duration-200 bg-white px-1 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs`

    return (
        <div className="relative flex flex-col w-full">
            {Icon && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                    <Icon size={18} />
                </div>
            )}
            {as === 'textarea' ? (
                <textarea
                    id={label}
                    name={label}
                    placeholder=" "
                    className={`${baseClass} resize-none ${Icon ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                />
            ) : as === 'select' ? (
                <select
                    id={label}
                    name={label}
                    className={`${baseClass} ${Icon ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}>
                    <option value="" disabled hidden>
                        {placeholder || ""}
                    </option>
                    {options.map((option) => (
                        <option key={option.value ?? option} value={option.value ?? option} className="">
                            {option.label ?? option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={label}
                    name={label}
                    placeholder=" "
                    className={`${baseClass} ${Icon ? 'pr-10' : ''}`}
                    value={value}
                    onChange={onChange}
                />
            )}
            <label
                htmlFor={label}
                className={`${labelClass} ${as === 'select' && value ? 'top-0 -translate-y-1/2 text-xs' : ''}`}>
                {title}
            </label>
        </div>
    )
}

export default InputBox;
