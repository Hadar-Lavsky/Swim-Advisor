import React from 'react';

const SectionCard = ({ 
  title, 
  children, 
  className = "",
  padding = "p-8 sm:p-12",
  titleClassName = "",
  titleSize = "text-3xl"
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg ${padding} mb-8 ${className}`}>
      {title && (
        <h2 className={`${titleSize} font-bold text-penguin-dark mb-6 ${titleClassName}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default SectionCard;

