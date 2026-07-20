import React from 'react';

const IconButton = ({
  label,
  icon: Icon,
  onClick,
  className = '',
  size = 20,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`p-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-98 flex items-center justify-center ${className}`}
      {...props}>
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
