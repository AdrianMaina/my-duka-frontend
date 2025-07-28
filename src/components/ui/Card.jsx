// FILE: src/components/ui/Card.jsx
// =======================================================================
import React from 'react';

const Card = ({ children, title, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 mb-6 transition-shadow hover:shadow-lg ${className || ''}`}>
            {title && <h3 className="text-xl font-semibold text-primary-blue border-b border-border-color pb-2 mb-4">{title}</h3>}
            <div className="text-base">
                {children}
            </div>
        </div>
    );
};

export default Card;