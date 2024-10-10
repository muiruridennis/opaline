import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  name?: string; // Add this prop
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium', name, placeholder = '?' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  // Function to get initials
  const getInitials = (name: string) => {
    const namesArray = name.split(' ');
    if (namesArray.length < 2) return namesArray[0].charAt(0).toUpperCase(); // Return first character for single name
    return namesArray[0].charAt(0).toUpperCase() + namesArray[1].charAt(0).toUpperCase(); // Return initials
  };
  
  const initials = name
      ? name.split(' ').map((word) => word[0]).join('').toUpperCase()
      : '';
  

  return (
    <div className={`inline-block rounded-full bg-gray-200 overflow-hidden ${sizeClasses[size]}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 font-bold">
          {name ? initials : placeholder}
        </div>
      )}
    </div>
  );
};
