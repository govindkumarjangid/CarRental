import React from 'react';
import { getImageKitUrl } from '../../utils/imageKit';

const UserAvatar = ({ src, name, size = 40, className = '' }) => {
  const optimizedSrc = getImageKitUrl(src, size, size);
  
  return (
    <img
      src={optimizedSrc}
      alt={name || 'User avatar'}
      width={size}
      height={size}
      loading="lazy"
      className={`rounded-full object-cover object-center ${className}`}
      onError={(e) => {
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random&rounded=true`;
      }}
    />
  );
};

export default UserAvatar;
