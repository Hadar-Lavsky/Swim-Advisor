import React from 'react';

const PageHeader = ({ 
  icon: Icon, 
  title, 
  description, 
  subtitle,
  className = "",
  titleSize = "default", // "default" | "large" | "small"
  descriptionColor = "gray", // "gray" | "blue"
  showIcon = true,
  bottomMargin = "mb-12" // "mb-12" | "mb-16"
}) => {
  // Title size classes
  const titleClasses = {
    default: "text-4xl sm:text-5xl font-bold text-penguin-dark mb-4",
    large: "text-4xl sm:text-5xl lg:text-6xl font-bold text-penguin-dark mb-6",
    small: "text-3xl sm:text-4xl font-bold text-penguin-dark mb-4"
  };

  // Description color classes
  const descriptionClasses = {
    gray: "text-lg text-gray-600",
    blue: "text-xl sm:text-2xl text-swim-blue-600 font-medium"
  };

  return (
    <div className={`text-center ${bottomMargin} ${className}`}>
      {/* Icon */}
      {Icon && showIcon && (
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-swim-blue-100 rounded-full">
            <Icon className="w-12 h-12 text-swim-blue-600" />
          </div>
        </div>
      )}

      {/* Title */}
      {title && (
        <h1 className={titleClasses[titleSize]}>
          {title}
        </h1>
      )}

      {/* Description */}
      {description && (
        <p className={`${descriptionClasses[descriptionColor]} max-w-2xl mx-auto ${descriptionColor === "blue" ? "max-w-3xl px-4" : ""}`}>
          {description}
        </p>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;

