import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.jsx';

const Logo = ({ className = '', iconOnly = false, size = 'md', to = '/' }) => {
  const iconSizes = {
    sm: 'h-8 w-8 md:h-9 md:w-9',
    md: 'h-9.5 w-9.5 md:h-11 md:w-11',
    lg: 'h-11 w-11 md:h-13 md:w-13',
  };

  const textSizes = {
    sm: 'text-base md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group shrink-0 select-none ${className}`}>
      <div className={`relative flex items-center justify-center p-0.5 rounded-lg shrink-0 ${iconSizes[size] || 'h-8 w-8'}`}>
        <img
          src={assets.logo}
          alt="DriveEasy Logo"
          className="w-full h-full object-contain filter drop-shadow-xs transition-transform"
        />
      </div>
      {!iconOnly && (
        <span className={`font-black tracking-tight text-gray-900 leading-none ${textSizes[size] || 'text-xl'}`}>
          Drive<span className="text-primary">Easy</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
